import { useAuth } from '../../auth/useAuth';
import Navbar from '../../components/Navbar'
import ChamadosList from '../../components/chamados/ChamadosList'
import { Link, Navigate } from 'react-router-dom';

const ChamadosIndex = () => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/usuarios/login" replace />;
    }
    return (
        <div>
            <Navbar />
            <h1 className='mx-2'>Pedidos</h1>
            <Link to="/" className="btn btn-primary mx-2">Voltar</Link>
            <Link to="/chamados/create" className='btn btn-secondary'>Criar pedido</Link>
            <ChamadosList />
        </div>
    );
}
export default ChamadosIndex;