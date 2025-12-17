import { Link } from 'react-router-dom';
import { useAuthFetch } from '../../auth/useAuthFetch';
import { useAuth } from '../../auth/useAuth';

const Chamado = ({ chamado, setError, onChamadoEstadoChange, onChamadoDelete }) => {
    const authFetch = useAuthFetch();
    const { user } = useAuth();
    const currentUserId = user?.sub;
    const currentUserIsAdmin = user?.papel == 1;
    const handleEstadoChange = async () => {
        const url = `http://localhost:3000/api/chamados/${chamado.id}`;
        const payload = JSON.stringify({
            estado: chamado.estado === 'a' ? 'f' : 'a',
        });
        try {
            const res = await authFetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: payload,
            });
            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.erro || `Erro HTTP: ${res.status}`);
            }
            const data = await res.json();
            onChamadoEstadoChange(data);
        } catch (err) {
            setError(err?.message || 'Erro inesperado');
        }
    };
    const handleChamadoDelete = async () => {
        const url = `http://localhost:3000/api/chamados/${chamado.id}`;
        try {
            const res = await authFetch(url, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.erro || `Erro HTTP: ${res.status}`);
            }
            onChamadoDelete(chamado.id);
        } catch (err) {
            setError(err?.message || 'Erro inesperado');
        }
    };
    return (
        <div>
            <div className="card m-2">
                <div className="card-header">
                    Chamado <strong>#{chamado.id}</strong> Usuário{' '}
                    <strong>#{chamado.Usuarios_id}</strong>
                </div>
                <div className="card-body">
                    {chamado.url_imagem && (
                        <img
                            className="me-2"
                            width={40}
                            src={chamado.url_imagem}
                            onError={(e) =>
                                (e.currentTarget.src = '/img/imagemErro404.png')
                            }
                        />
                    )}
                    <Link to={`/chamados/${chamado.id}`} className='text-body text-decoration-none'>{chamado.texto}</Link>
                </div>
                <div className="card-footer text-body-secondary">
                    {chamado.estado === 'a' && (
                        <button
                            className="btn btn-light me-2"
                            onClick={handleEstadoChange}
                            disabled={!currentUserIsAdmin && currentUserId != chamado.Usuarios_id}
                        >
                            Aberto
                        </button>
                    )}
                    {chamado.estado === 'f' && (
                        <button
                            className="btn btn-dark me-2"
                            onClick={handleEstadoChange}
                            disabled={!currentUserIsAdmin && currentUserId != chamado.Usuarios_id}
                        >
                            Respondido
                        </button>
                    )}
                    {(currentUserId == chamado.Usuarios_id || currentUserIsAdmin) && <Link to={`/chamados/${chamado.id}/edit`} className="btn btn-info me-2 text-white">Editar</Link>}
                    {(currentUserId == chamado.Usuarios_id || currentUserIsAdmin) && <button className="btn btn-danger me-2" onClick={handleChamadoDelete}>Remover</button>}
                </div>
            </div>
        </div>
    );
};
export default Chamado;