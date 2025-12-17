import { useAuth } from '../../auth/useAuth';
import Navbar from '../../components/Navbar'
import ChamadoFormCreate from '../../components/chamados/ChamadoFormCreate'
import { Link, Navigate } from 'react-router-dom';

const ChamadosCreate = () => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/usuarios/login" replace />;
    }
    return (
        <div>
            <Navbar />
            <h1 className='mx-2'>Faça seu pedido para marcar uma reunião para orçamento de projeto ou obra!</h1>
            <Link to="/chamados" className='btn btn-secondary mx-2'>Voltar</Link>
            <ChamadoFormCreate />
        </div>
    )
}
export default ChamadosCreate