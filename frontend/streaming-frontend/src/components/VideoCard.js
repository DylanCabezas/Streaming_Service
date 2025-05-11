// components/VideoCard.js
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <div className="video-card">
      <Link to={`/watch/${video.video_id}`}>
        <img
          src={video.thumbnail || "/default-thumbnail.jpg"}
          alt={video.title}
        />
        <h3>{video.title}</h3>
      </Link>
    </div>
  );
}
