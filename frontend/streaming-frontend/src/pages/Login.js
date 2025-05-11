import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.scss"; // Importa los estilos

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:8000/users");
      const user = res.data.find(
        (u) => u.email === email && u.username === usuario
      );
      if (user) {
        localStorage.setItem("user_id", user.user_id);
        onLogin(user.user_id); 
      } else {
        setMensaje("Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMensaje("Ocurrió un error.");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
}

export default Login;
