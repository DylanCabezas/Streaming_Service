import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Historial.scss';

const Historial = () => {
  const [history, setHistory] = useState([
    {
      id: 1,
      title: "Fight Club",
      description: "Un oficinista insomne y un fabricante de jabón forman un club de lucha clandestino.",
      thumbnail: "/images/films/drama/fight-club/small.jpg",
      watchedAt: "2024-03-20T15:30:00"
    },
    {
      id: 2,
      title: "The King's Speech",
      description: "La historia del rey Jorge VI y su lucha contra la tartamudez.",
      thumbnail: "/images/films/drama/kings-speech/small.jpg",
      watchedAt: "2024-03-19T20:15:00"
    },
    {
      id: 3,
      title: "The Prestige",
      description: "Dos magos rivales en la Inglaterra victoriana.",
      thumbnail: "/images/films/drama/the-prestige/small.jpg",
      watchedAt: "2024-03-18T22:45:00"
    }
  ]);

  useEffect(() => {
    // TODO: Fetch watch history from API
    // This is mock data for now
    setHistory([
      {
        id: 1,
        title: "Video 1",
        thumbnail: "/assets/thumbnails/video-1.jpg",
        lastWatched: "2024-03-15T10:30:00",
        progress: 75
      },
      {
        id: 2,
        title: "Video 2",
        thumbnail: "/assets/thumbnails/video-2.jpg",
        lastWatched: "2024-03-14T15:45:00",
        progress: 100
      },
      {
        id: 3,
        title: "Video 3",
        thumbnail: "/assets/thumbnails/video-3.jpg",
        lastWatched: "2024-03-13T20:15:00",
        progress: 30
      }
    ]);
  }, []);

  const clearHistory = async () => {
    // TODO: Implement clear history API call
    setHistory([]);
  };

  const removeFromHistory = async (videoId) => {
    // TODO: Implement remove from history API call
    setHistory(history.filter(video => video.id !== videoId));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="historial-page">
      <div className="historial-header">
        <h1>Historial de Visualización</h1>
        {history.length > 0 && (
          <button className="clear-button" onClick={clearHistory}>
            Limpiar Historial
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="empty-history">
          <p>No hay videos en tu historial.</p>
          <Link to="/" className="browse-button">
            Explorar Contenido
          </Link>
        </div>
      ) : (
        <div className="history-list">
          {history.map(video => (
            <div key={video.id} className="history-item">
              <Link to={`/watch/${video.id}`} className="video-link">
                <div className="thumbnail-container">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${video.progress}%` }}
                    />
                  </div>
                </div>
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <span className="last-watched">
                    Visto el {formatDate(video.lastWatched)}
                  </span>
                </div>
              </Link>
              <button
                className="remove-button"
                onClick={() => removeFromHistory(video.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Historial; 