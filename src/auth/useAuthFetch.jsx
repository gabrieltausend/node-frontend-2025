// Este hook cria uma função "authFetch" que faz requisições HTTP com:
// 1) Access Token no header Authorization (quando existir em sessionStorage)
// 2) Cookies incluídos (credentials: 'include') — necessário para enviar o refresh_token HttpOnly
// 3) Renovação automática do access token quando a API responder 401 (não autorizado)
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useAuthFetch = () => {
  const navigate = useNavigate();
  const authFetch = useCallback(
    /**
     * authFetch(url, fetchOptions)
     * @param {string} url
     * @param {RequestInit} fetchOptions
     * @returns {Promise<Response>}
     */
    async (url, fetchOptions = {}) => {
      const { signal, headers: originalHeaders, ...restOptions } = fetchOptions;
      const headers = new Headers(originalHeaders || {});
      const accessToken = sessionStorage.getItem("at");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      const baseOptions = {
        ...restOptions,
        signal,
      };
      let res = await fetch(url, { ...baseOptions, headers });
      if (res.status !== 401) {
        return res;
      }
      const refreshRes = await fetch("http://localhost:3000/api/usuarios/refresh", {
        method: "POST",
        credentials: "include",
        signal,
      });
      if (!refreshRes.ok) {
        sessionStorage.removeItem("at");
        navigate("/usuarios/login", { replace: true });
        return res;
      }
      const data = await refreshRes.json().catch(() => ({}));
      const newAccessToken = data?.access_token;
      if (!newAccessToken) {
        sessionStorage.removeItem("at");
        navigate("/usuarios/login", { replace: true });
        return res;
      }
      sessionStorage.setItem("at", newAccessToken);
      headers.set("Authorization", `Bearer ${newAccessToken}`);
      res = await fetch(url, { ...baseOptions, headers });
      return res;
    },
    [navigate]
  );
  return authFetch;
};
export { useAuthFetch };