import React from "react";
import { Link } from "react-router-dom";
import { useAuth, logout } from "../auth";




const LoggedInLinks = () => {
    return (
        <>
            <div className="navbar-nav">

                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                <Link className="nav-link" to="/create">Create</Link>
            </div>
            <button className="btn btn-outline-success me-2" style={{marginLeft:"auto"}} type="button">
                <a href="#" onClick={()=>{logout()}} style={{ textDecoration: 'none', color: 'white' }}>Log Out</a>
            </button>

        </>
    )
}

const LoggedOutLinks = () => {
    return (
        <>
            <Link className="nav-link" aria-current="page" to="/">Home</Link>
            <button className="btn btn-outline-success me-2" type="button">
                <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
            </button>
            <button className="btn btn-outline-success me-2" type="button" >
                <Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>Sign Up</Link>
            </button>
        </>
    )
}
const Navbar = () => {

    const [logged] = useAuth()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container d-flex justify-content-end">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {logged ? <LoggedInLinks /> : <LoggedOutLinks />}
            <div className="end">

            </div>
        </div>
        </nav >
    )
}

export default Navbar