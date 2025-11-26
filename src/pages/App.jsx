import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useAuth } from "../auth/useAuth";

const App = () => {
    const { user } = useAuth();
    return (
        <div>
            <Navbar />
            {/* Imagem centralizada */}
            <div className="flex justify-center items-center mt-8">
                <img 
                    src="/logo.png" 
                    alt="Logo" 
                    className="w-48 h-auto"
                />
            </div>
            <div className="flex flex-col items-center mt-6">
                {!user && (
                    <>
                        <Link to="/usuarios/login" className="btn btn-secondary m-4">
                            Entrar como Usuário
                        </Link>
                        <Link to="/usuarios/register" className="btn btn-secondary m-4">
                            Registrar Usuário
                        </Link>
                    </>
                )}
                <Link to="/chamados" className="btn btn-secondary m-4">Pedidos</Link>
                <Link to="/chamados/create" className="btn btn-secondary m-4">Criar Pedido</Link>
            </div>
        </div>
    )
}
export default App