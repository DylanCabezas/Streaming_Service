import React, { useEffect, useState } from "react";
// import RatingForm from "../components/RatingForm";
import axios from "axios";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8000/favorites/${userId}`)
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error("Error al cargar favoritos:", err));
  }, [userId]);

  const removeFromFavorites = async (videoId) => {
    try {
      await axios.delete(`http://localhost:8000/favorite/${videoId}`);
      setFavorites(favorites.filter((video) => video.video_id !== videoId));
    } catch (err) {
      console.error("Error al eliminar de favoritos:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Mis Favoritos</h2>
      {favorites.length === 0 ? (
        <p>No tienes videos en favoritos.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {favorites.map((video) => (
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
              <p>{video.descripcion}</p>
              {/* <RatingForm videoId={video.video_id} /> */}

              <button onClick={() => removeFromFavorites(video.video_id)}>
                Eliminar de favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
