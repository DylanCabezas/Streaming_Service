import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.scss';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    edad: '',
    genero: '',
    ciudad: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch user data from API
    // This is mock data for now
    const mockUser = {
      id: 1,
      username: "usuario123",
      email: "usuario@example.com",
      edad: 25,
      genero: "masculino",
      ciudad: "Madrid"
    };
    setUser(mockUser);
    setFormData(mockUser);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement update profile API call
    try {
      // const response = await fetch(`/api/user/${user.id}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // if (response.ok) {
      //   setUser(formData);
      //   setIsEditing(false);
      // }
      console.log('Profile update:', formData);
      setUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      // TODO: Implement delete account API call
      try {
        // const response = await fetch(`/api/user/${user.id}`, {
        //   method: 'DELETE'
        // });
        // if (response.ok) {
        //   navigate('/login');
        // }
        console.log('Account deleted');
        navigate('/login');
      } catch (error) {
        console.error('Delete account error:', error);
      }
    }
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Mi Perfil</h1>
          {!isEditing && (
            <button
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Editar Perfil
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Nombre de Usuario</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Edad</label>
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Género</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
              >
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Ciudad</label>
              <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="save-button">
                Guardar Cambios
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setFormData(user);
                  setIsEditing(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-group">
              <label>Nombre de Usuario</label>
              <p>{user.username}</p>
            </div>
            <div className="info-group">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
            <div className="info-group">
              <label>Edad</label>
              <p>{user.edad} años</p>
            </div>
            <div className="info-group">
              <label>Género</label>
              <p>{user.genero}</p>
            </div>
            <div className="info-group">
              <label>Ciudad</label>
              <p>{user.ciudad}</p>
            </div>
          </div>
        )}

        <div className="danger-zone">
          <h2>Zona de Peligro</h2>
          <button
            className="delete-button"
            onClick={handleDeleteAccount}
          >
            Eliminar Cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 