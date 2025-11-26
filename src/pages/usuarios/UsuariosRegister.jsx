import { Link } from 'react-router-dom'
import Navbar from "../../components/Navbar"
import UsuariosFormRegister from '../../components/usuarios/UsuarioFormRegister'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

const UsuariosRegister = () => {
    const { user } = useAuth();
    if (user) {
        return <Navigate to="/" replace />;
    }
    return (
        <div>
            <Navbar />
            <h1 className='mx-2'>Registro de Usuários</h1>
            <Link to="/" className="btn btn-secondary mx-2">Voltar</Link>
            <UsuariosFormRegister />
        </div>
    )
}
export default UsuariosRegister