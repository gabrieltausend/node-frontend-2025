// Realiza a busca da lista de "chamados" no backend,
// guarda cache no localStorage, mostra erros em toast e
// renderiza itens usando pedido
import { useState, useEffect } from 'react';
import Chamado from './Chamado';
import { useAuthFetch } from '../../auth/useAuthFetch';
import Toast from '../Toast';
const ChamadosList = () => {
    const chamadosCache = JSON.parse(localStorage.getItem('chamadosCache'));
    const [chamados, setChamados] = useState(chamadosCache ?? []);
    const [loading, setLoading] = useState(chamadosCache ? false : true);
    const [error, setError] = useState(null);
    const authFetch = useAuthFetch();
    useEffect(() => {
        const abortController = new AbortController();
        const fetchChamados = async () => {
            try {
                const res = await authFetch('http://localhost:3000/api/chamados', {
                    method: 'GET',
                    signal: abortController.signal,
                });
                if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
                if (res.status === 304) return;
                const data = await res.json();
                setChamados(data);
                localStorage.setItem('chamadosCache', JSON.stringify(data));
            } catch (error) {
                if (error?.name === 'AbortError') return;
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchChamados();
        const interval5secs = setInterval(fetchChamados, 5000);
        return () => {
            abortController.abort();
            clearInterval(interval5secs);
        };
    }, [authFetch]);
    const onChamadoEstadoChange = (chamadoAlterado) => {
        const newChamados = chamados.map((ch) =>
            ch.id == chamadoAlterado.id ? chamadoAlterado : ch
        );
        setChamados(newChamados);
    };
    const onChamadoDelete = (chamadoDeletadoId) => {
        const newChamados = chamados.filter((ch) =>
            ch.id != chamadoDeletadoId
        );
        setChamados(newChamados);
    };
    if (loading) {
        return <p>Carregando pedidos...</p>;
    }
    return (
        <div>
            {error && <Toast error={error} setError={setError} />}
            <div>
                {chamados.map((chamado) => (
                    <Chamado
                        key={chamado.id}
                        chamado={chamado}
                        setError={setError}
                        onChamadoEstadoChange={onChamadoEstadoChange}
                        onChamadoDelete={onChamadoDelete}
                    />
                ))}
            </div>
        </div>
    );
};
export default ChamadosList;