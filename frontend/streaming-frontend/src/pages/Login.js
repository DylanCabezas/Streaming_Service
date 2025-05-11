import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    API.get("/users")
      .then((res) => {
        const user = res.data.find(
          (u) => u.email === email && u.username === username
        );
        if (user) {
          setUserId(user.user_id);
          localStorage.setItem("user_id", user.user_id);
          navigate("/");
        } else {
          alert("Usuario no encontrado");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Iniciar sesión</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
      <p>
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </form>
  );
}

export default Login;
