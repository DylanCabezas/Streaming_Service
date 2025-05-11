import React, { useEffect, useState } from "react";
import VideoSlider from "../components/VideoSlider";
import axios from "axios";

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/videos").then((res) => {
      // Puedes mapear para simular thumbnails si no vienen en la API
      const enriched = res.data.map((v) => ({
        ...v,
        thumbnailUrl: `/assets/thumbnails/${v.video_id}.jpg`, // asegúrate de que existan
      }));
      setVideos(enriched);
    });
  }, []);

  return (
    <div>
      <VideoSlider title="Populares" videos={videos.slice(0, 10)} />
      <VideoSlider
        title="Acción"
        videos={videos.filter((v) => v.genre === "acción")}
      />
      <VideoSlider
        title="Comedia"
        videos={videos.filter((v) => v.genre === "comedia")}
      />
    </div>
  );
}

export default Home;
