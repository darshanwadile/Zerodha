import "./NavBar.css"
import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <>
    <div className="container-fluid">
        <nav className="navbar navbar-expand-lg">
            <div className="container p-2 parent">
                <a href={"/"}><img src="/media/images/logo.svg" alt="Zerodha Logo" className="logo ms-5"  /></a>
                <div className="d-flex align-items-center">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/signup">Signup</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/about">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/products">Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/pricing">Pricing</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/support">Support</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</> 
    )
}