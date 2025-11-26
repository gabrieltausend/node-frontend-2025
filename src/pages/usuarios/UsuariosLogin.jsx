import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import UsuariosFormLogin from "../../components/usuarios/UsuarioFormLogin";
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../auth/useAuth";

const UsuariosLogin = () => {
    const { user } = useAuth();
    if (user) {
        return <Navigate to="/" replace />;
    }
    return (
        <div>
            <Navbar />
            <h1 className="mx-2">Login de Usuários</h1>
            <Link to="/" className="btn btn-secondary mx-2">Voltar</Link>
            <UsuariosFormLogin />
        </div>
    );
};
export default UsuariosLogin;