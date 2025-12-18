// Este componente exibe um formulário para criação de um novo “pedido”
// Guarda os valores digitados em estados locais (useState)
// envia dados para o backend (POST /api/chamados) e, caso de certo
// redireciona o usuário para a lista de pediddos ("/chamados")
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthFetch } from '../../auth/useAuthFetch';
import Toast from '../Toast';
const ChamadoFormCreate = () => {
    const [texto, setTexto] = useState("");
    const [estado, setEstado] = useState("a");
    const [imagem, setImagem] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const authFetch = useAuthFetch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('texto', texto);
        fd.append('estado', estado);
        if (imagem) fd.append('imagem', imagem);
        try {
            const response = await authFetch('https://ac-projetos-backend.onrender.com/api/chamados', {
                method: 'POST',
                body: fd
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.erro
                    ? `Erro HTTP: STATUS ${response.status} ${errorData?.erro} ${response.statusText}`
                    : `Erro HTTP: STATUS ${response.status} ${response.statusText}`;
                throw new Error(errorMessage);
            }
            navigate("/chamados");
        } catch (error) {
            if (error?.name !== 'AbortError') setError(error.message);
        }
    }
    return (
        <form onSubmit={handleSubmit} className='m-2' encType="multipart/form-data">
            {error && <Toast error={error} setError={setError} />}
            <div className='my-2'>
                <label className='form-label' htmlFor="id-input-texto">Qual seu pedido?</label>
                <input
                    className='form-control'
                    type="text"
                    id="id-input-texto"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder='Digite o texto do chamado'
                />
            </div>
            <div className='my-2'>
                <label className='form-label' htmlFor="id-select-estado">Estado do pedido:</label>
                <select
                    id='id-select-estado'
                    className='form-select'
                    onChange={(e) => setEstado(e.target.value)}
                >
                    <option value="a">Aberto</option>
                </select>
            </div>
            <div className='my-2'>
                <button type='submit' className='btn btn-secondary'>Enviar</button>
            </div>
        </form>
    )
}
export default ChamadoFormCreate