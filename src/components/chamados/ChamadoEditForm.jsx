import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthFetch } from '../../auth/useAuthFetch';
import Toast from '../Toast';

const ChamadoEditForm = ({ chamado }) => {
    const [texto, setTexto] = useState(chamado.texto);
    const [estado, setEstado] = useState(chamado.estado);
    const [imagem, setImagem] = useState(null);
    const [hasImagem, setHasImagem] = useState(chamado.url_imagem ? true : false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const authFetch = useAuthFetch();
    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('texto', texto);
        formData.append('estado', estado);
        if (imagem) {
            formData.append('imagem', imagem);
        }
        try {
            const response = await authFetch(`https://ac-projetos-backend.onrender.com/api/chamados/${chamado.id}`, {
                method: 'PUT',
                body: formData,
            });
            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.erro || `Erro HTTP: ${response.status}`);
            }
            await response.json();
            navigate(`/chamados`);
        } catch (error) {
            if (error?.name !== 'AbortError') setError(error.message);
        }
    }
    const deleteImageChamado = async () => {
        try {
            const response = await authFetch(`http://localhost:3000/api/chamados/${chamado.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url_imagem: null }),
            });
            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.erro || `Erro HTTP: ${response.status}`);
            }
            setHasImagem(false);
        } catch (error) {
            if (error?.name !== 'AbortError') setError(error.message);
        }
    };
    return (
        <form onSubmit={submitForm} className='m-2'>
            {error && <Toast error={error} setError={setError} />}
            <div className='my-2'>
                <label htmlFor="id-input-texto" className='form-label'>Modifique seu pedido:</label>
                <input className="form-control" type="text" id="id-input-texto" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder='Digite o texto do chamado' />
            </div>
            <div className='my-2'>
                <label htmlFor="id-input-estado" className='form-label'>Estado do pedido</label>
                <select
                    className="form-control"
                    id="id-input-estado"
                    value={estado}
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
export default ChamadoEditForm