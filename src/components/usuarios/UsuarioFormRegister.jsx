// Componente de REGISTRO
// Ao enviar, ele chama POST /api/usuarios/register no backend
// Caso de certo, o backend devolve:
//   - access_token (curta duração) → guardamos na sessionStorage
//   - refresh token (longa duração) → vem em cookie HttpOnly (o JS não vê)
// Depois do registro bem-sucedido, atualiza o contexto de autenticação e redireciona para "/"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Toast from "../Toast";
import { useAuth } from "../../auth/useAuth";

const UsuariosFormRegister = () => {
  const [nome, setNome] = useState("");
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
      const res = await fetch("https://ac-projetos-backend.onrender.com/api/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nome, email, senha }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.erro || "Falha no registro");
      }
      const at = data?.access_token;
      if (!at) throw new Error("Resposta sem access_token");
      sessionStorage.setItem("at", at);
      try {
        const decoded = jwtDecode(at);
        setUser(decoded);
      } catch (e) {
        console.error("Falha ao decodificar access_token no registro:", e);
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
      {/* Toast de erro
         Renderiza somente quando "error" tem conteúdo. */}
      {error && <Toast error={error} setError={setError} />}
      {/* Formulário controlado:
          - value vem do estado
          - onChange atualiza o estado */}
      <form onSubmit={handleSubmit} className="m-2">
        <div className="my-2">
          <label htmlFor="id-input-nome" className="form-label">
            Nome
          </label>
          <input
            id="id-input-nome"
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            placeholder="Digite seu nome"
          />
        </div>
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
        {/* Botão desabilita enquanto loading=true para evitar duplo submit */}
        <button type="submit" className="btn btn-secondary" disabled={loading}>
          {loading ? "Registrando…" : "Registrar"}
        </button>
      </form>
    </div>
  );
};
export default UsuariosFormRegister;