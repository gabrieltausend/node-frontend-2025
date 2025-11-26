// Componente de LOGIN
// Envia email/senha para POST /api/usuarios/login
// Se der certo, o backend retorna:
//   - access_token (curta duração) → salvamos na sessionStorage
//   - refresh token (longa duração) → vem num cookie HttpOnly (o JS não acessa)
// Depois do login, atualiza o contexto de autenticação e redireciona para "/"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Toast from "../Toast";
import { useAuth } from "../../auth/useAuth";
const UsuariosFormLogin = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, senha }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.erro || "Falha no login");
      }
      const at = data?.access_token;
      if (!at) throw new Error("Resposta sem access_token");
      sessionStorage.setItem("at", at);
      try {
        const decoded = jwtDecode(at);
        setUser(decoded);
      } catch (e) {
        console.error("Falha ao decodificar access_token no login:", e);
        setUser(null);
      }
      setSenha("");
      navigate("/");
    } catch (error) {
      setError(error.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      {/* Toast de erro. Só aparece quando "error" tem conteúdo */}
      {error && <Toast error={error} setError={setError} />}
      {/* Formulário controlado:
          - cada input utiliza value={estado}
          - onChange atualiza o estado correspondente */}
      <form onSubmit={handleSubmit} className="m-2">
        <div className="my-2">
          <label htmlFor="id-input-email" className="form-label">
            E-mail
          </label>
          <input
            id="id-input-email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Digite seu e-mail"
          />
        </div>
        <div className="my-2">
          <label htmlFor="id-input-senha" className="form-label">
            Senha
          </label>
          <input
            id="id-input-senha"
            type="password"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            placeholder="Digite sua senha"
          />
        </div>
        {/* Enquanto loading=true, desabilita o botão e mostra "Entrando…" */}
        <button type="submit" className="btn btn-secondary" disabled={loading}>
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
};
export default UsuariosFormLogin;