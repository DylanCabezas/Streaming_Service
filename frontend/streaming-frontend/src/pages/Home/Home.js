import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './Home.scss';

const Home = () => {
  const [featuredContent, setFeaturedContent] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // TODO: Fetch featured content and categories from API
    // This is mock data for now
    setFeaturedContent({
      id: 1,
      title: "Fight Club",
      description: "Un oficinista insomne y un fabricante de jabón forman un club de lucha clandestino que se convierte en algo mucho más grande.",
      image: "/images/misc/home-bg.jpg",
      videoUrl: "/videos/bunny.mp4" // Using the available video
    });

    setCategories([
      {
        id: 1,
        title: "Drama",
        items: [
          { 
            id: 1, 
            title: "Fight Club", 
            image: "/images/films/drama/fight-club/small.jpg",
            description: "Un oficinista insomne y un fabricante de jabón forman un club de lucha clandestino."
          },
          { 
            id: 2, 
            title: "The King's Speech", 
            image: "/images/films/drama/kings-speech/small.jpg",
            description: "La historia del rey Jorge VI y su lucha contra la tartamudez."
          },
          { 
            id: 3, 
            title: "The Prestige", 
            image: "/images/films/drama/the-prestige/small.jpg",
            description: "Dos magos rivales en la Inglaterra victoriana."
          },
          { 
            id: 4, 
            title: "The Revenant", 
            image: "/images/films/drama/the-revenant/small.jpg",
            description: "Un explorador lucha por sobrevivir en el salvaje oeste americano."
          },
          { 
            id: 5, 
            title: "The Social Network", 
            image: "/images/films/drama/the-social-network/small.jpg",
            description: "La historia de la creación de Facebook."
          }
        ]
      },
      {
        id: 2,
        title: "Romance",
        items: [
          { 
            id: 6, 
            title: "Romance Movie 1", 
            image: "/images/films/romance/movie1/small.jpg",
            description: "Una historia de amor que te cautivará."
          },
          { 
            id: 7, 
            title: "Romance Movie 2", 
            image: "/images/films/romance/movie2/small.jpg",
            description: "Un romance que te hará soñar."
          },
          { 
            id: 8, 
            title: "Romance Movie 3", 
            image: "/images/films/romance/movie3/small.jpg",
            description: "Una historia de amor que te tocará el corazón."
          },
          { 
            id: 9, 
            title: "Romance Movie 4", 
            image: "/images/films/romance/movie4/small.jpg",
            description: "Un romance que te dejará sin palabras."
          },
          { 
            id: 10, 
            title: "Romance Movie 5", 
            image: "/images/films/romance/movie5/small.jpg",
            description: "Una historia de amor que te cautivará."
          }
        ]
      },
      {
        id: 3,
        title: "Suspense",
        items: [
          { 
            id: 11, 
            title: "Suspense Movie 1", 
            image: "/images/films/suspense/movie1/small.jpg",
            description: "Una historia llena de suspense y misterio."
          },
          { 
            id: 12, 
            title: "Suspense Movie 2", 
            image: "/images/films/suspense/movie2/small.jpg",
            description: "Un thriller psicológico que te mantendrá en suspenso."
          },
          { 
            id: 13, 
            title: "Suspense Movie 3", 
            image: "/images/films/suspense/movie3/small.jpg",
            description: "Una película de suspense que te dejará sin aliento."
          },
          { 
            id: 14, 
            title: "Suspense Movie 4", 
            image: "/images/films/suspense/movie4/small.jpg",
            description: "Un misterio que te hará cuestionar todo."
          },
          { 
            id: 15, 
            title: "Suspense Movie 5", 
            image: "/images/films/suspense/movie5/small.jpg",
            description: "Un thriller que te mantendrá al borde del asiento."
          }
        ]
      }
    ]);
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  if (!featuredContent || categories.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>{featuredContent.title}</h1>
          <p>{featuredContent.description}</p>
          <div className="hero-buttons">
            <Link to={`/watch/${featuredContent.id}`} className="play-button">
              <i className="fas fa-play"></i> Reproducir
            </Link>
            <button className="more-info-button">
              <i className="fas fa-info-circle"></i> Más Información
            </button>
          </div>
        </div>
        <div className="hero-overlay"></div>
        <img src={featuredContent.image} alt={featuredContent.title} className="hero-image" />
      </div>

      {/* Category Rows */}
      {categories.map(category => (
        <div key={category.id} className="category-row">
          <h2 className="category-title">{category.title}</h2>
          <Slider {...sliderSettings} className="content-slider">
            {category.items.map(item => (
              <div key={item.id} className="content-item">
                <Link to={`/watch/${item.id}`}>
                  <div className="content-card">
                    <img src={item.image} alt={item.title} />
                    <div className="content-overlay">
                      <div className="content-info">
                        <h3>{item.title}</h3>
                        <p className="content-description">{item.description}</p>
                        <div className="content-actions">
                          <button className="play-button-small">
                            <i className="fas fa-play"></i>
                          </button>
                          <button className="add-button">
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default Home; 