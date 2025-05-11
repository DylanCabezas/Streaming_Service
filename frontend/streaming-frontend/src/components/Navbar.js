import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ backgroundColor: "#000", padding: "10px" }}>
      <Link to="/" style={{ color: "white", marginRight: "10px" }}>
        Inicio
      </Link>
      <Link to="/favorites" style={{ color: "white", marginRight: "10px" }}>
        Favoritos
      </Link>
      <Link to="/profile" style={{ color: "white", marginRight: "10px" }}>
        Perfil
      </Link>
      <Link to="/login" style={{ color: "white", marginRight: "10px" }}>
        Login
      </Link>
      <Link to="/register" style={{ color: "white" }}>
        Registro
      </Link>
    </nav>
  );
}

export default Navbar;
