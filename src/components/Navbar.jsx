import { Link, NavLink } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import NavbarLoggedUser from "./NavbarLoggedUser";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    AC - Projetos e Construções
                </Link>
                <div className="d-flex align-items-center ms-auto order-lg-3">
                    <ThemeButton />
                    <NavbarLoggedUser />
                    <button
                        className="navbar-toggler ms-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div
                    className="collapse navbar-collapse order-lg-2"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/sobre" className="nav-link">
                                Sobre
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/chamados" className="nav-link">
                                Pedidos
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}