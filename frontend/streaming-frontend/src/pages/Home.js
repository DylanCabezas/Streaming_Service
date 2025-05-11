import React, { useEffect, useState } from "react";
// import RatingForm from "../components/RatingForm";
import axios from "axios";
import "../styles/Home.scss";

function Home() {
  const [videos, setVideos] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    axios
      .get("http://localhost:8000/videos")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error("Error al cargar los videos:", err));
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">Explora nuestros videos</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.video_id} className="video-card">
            <h3>{video.titulo}</h3>
            <p>
              <strong>Género:</strong> {video.genero}
            </p>
            <p>{video.descripcion}</p>
            {/* <RatingForm videoId={video.video_id} /> */}
            {/* Aquí podrías agregar botón para ver o agregar a favoritos */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
