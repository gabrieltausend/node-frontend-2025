import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import ChamadoEditForm from '../../components/chamados/ChamadoEditForm';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useAuthFetch } from '../../auth/useAuthFetch';
import { useAuth } from '../../auth/useAuth';

const ChamadosEdit = () => {
    const { id } = useParams();
    const [chamadoData, setChamadoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const authFetch = useAuthFetch();

    useEffect(() => {
        const fetchChamadoById = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await authFetch(`https://ac-projetos-backend.onrender.com/api/chamados/${id}`);
                if (!response.ok) {
                    throw new Error('Não foi possível carregar os dados do chamado.');
                }
                const data = await response.json();
                setChamadoData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchChamadoById();
    }, [id, authFetch]);
    if (!user) {
        return <Navigate to="/usuarios/login" replace />;
    }
    if (loading) {
        return <p>Carregando formulário...</p>;
    }
    if (error) {
        return <p style={{ color: 'red' }}>Erro: {error}</p>;
    }
    return (
        <div>
            <Navbar />
            <h1 className='mx-2'>Faça uma edição em seu pedido, caso queira acrescentar algo ou realizar uma correção</h1>
            <Link to="/chamados" className="btn btn-secondary mx-2">Voltar</Link>
            <ChamadoEditForm chamado={chamadoData} />
        </div>
    );
};
export default ChamadosEdit;