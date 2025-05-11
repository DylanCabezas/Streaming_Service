import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const userId = localStorage.getItem("user_id");
  const [user, setUser] = useState({
    username: "",
    email: "",
    edad: "",
    genero: "",
    ciudad: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:8000/user/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error al obtener perfil:", err));
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8000/user/${userId}`, user);
      setMessage("Perfil actualizado correctamente.");
      setEditMode(false);
    } catch (err) {
      setMessage("Error al actualizar perfil.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Mi Perfil</h2>
      {message && <p>{message}</p>}
      {!editMode ? (
        <div>
          <p>
            <strong>Nombre de usuario:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Edad:</strong> {user.edad}
          </p>
          <p>
            <strong>Género:</strong> {user.genero}
          </p>
          <p>
            <strong>Ciudad:</strong> {user.ciudad}
          </p>
          <button onClick={() => setEditMode(true)}>Editar perfil</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Nombre de usuario:</label>
            <input
              name="username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Edad:</label>
            <input
              name="edad"
              type="number"
              value={user.edad}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Género:</label>
            <input
              name="genero"
              value={user.genero}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Ciudad:</label>
            <input
              name="ciudad"
              value={user.ciudad}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
}

export default Profile;
