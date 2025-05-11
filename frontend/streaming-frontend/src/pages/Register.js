// src/pages/Register.js
import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.scss";

function Register({ onRegister }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    edad: "",
    genero: "",
    ciudad: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/user", form);
      localStorage.setItem("user_id", res.data.user_id);
      if (onRegister) onRegister(res.data.user_id);
    } catch (err) {
      console.error("Error al registrarse:", err);
      setMensaje("Ocurrió un error al registrarse.");
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Regístrate</h2>
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={form.edad}
          onChange={handleChange}
          required
        />
        <select
          name="genero"
          value={form.genero}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona género</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={form.ciudad}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
}

export default Register;
