import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../auth/useAuth";

// IMPORT DAS IMAGENS
import logo from "../assets/logo.png";
import crn1 from "../assets/crn1.png";
import crn2 from "../assets/crn2.png";
import crn3 from "../assets/crn3.png";

const App = () => {
    const { user } = useAuth();

    return (
        <div>
            <Navbar />

            <div className="flex justify-center items-center mt-8">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-30 h-auto"
                />
            </div>

            <div className="flex flex-col items-center mt-6">
                <Link to="/chamados/create" className="btn btn-secondary m-4">
                    Criar um Pedido
                </Link>
            </div>

            <div
                id="carouselExampleControls"
                className="carousel slide"
                data-bs-ride="carousel"
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            className="d-block w-50 mx-auto"
                            src={crn1}
                            alt="Fachada 1 CRN"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            className="d-block w-50 mx-auto"
                            src={crn2}
                            alt="Fachada 2 CRN"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            className="d-block w-50 mx-auto"
                            src={crn3}
                            alt="Fachada 3 CRN"
                        />
                    </div>
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon"></span>
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>

            <h2 className="mx-2">Contatos</h2>
            <h3 className="mx-3">
                Email: contato@acprojeto.com.br, Instagram: acprojetoseconstrucoes,
                Whatsapp: (49)99907-6820
            </h3>
        </div>
    );
};

export default App;