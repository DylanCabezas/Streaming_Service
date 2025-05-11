import React, { useEffect, useState } from "react";
import axios from "axios";

function Historial() {
  const [historial, setHistorial] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) return;
    axios
      .get("http://localhost:8000/historial", {
        headers: { user_id: userId },
      })
      .then((res) => setHistorial(res.data))
      .catch((err) => console.error("Error al obtener historial:", err));
  }, [userId]);

  const eliminarVideo = async (videoId) => {
    try {
      await axios.put(`http://localhost:8000/historial/${videoId}`, null, {
        headers: { user_id: userId },
      });
      setHistorial(historial.filter((video) => video.video_id !== videoId));
    } catch (err) {
      console.error("Error al eliminar video del historial:", err);
    }
  };

  const eliminarTodo = async () => {
    try {
      await axios.delete("http://localhost:8000/historial", {
        headers: { user_id: userId },
      });
      setHistorial([]);
    } catch (err) {
      console.error("Error al eliminar todo el historial:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Historial de visualización</h2>
      {historial.length === 0 ? (
        <p>No has visto ningún video aún.</p>
      ) : (
        <>
          <button onClick={eliminarTodo}>Eliminar todo el historial</button>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {historial.map((video) => (
              <div
                key={video.video_id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "1rem",
                  width: "200px",
                }}
              >
                <h3>{video.titulo}</h3>
                <p>
                  <strong>Género:</strong> {video.genero}
                </p>
                <button onClick={() => eliminarVideo(video.video_id)}>
                  Eliminar del historial
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Historial;
