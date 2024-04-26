import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    contraseña: '',
    rol: 'Cliente',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', formData);
      setMessage(response.data);
      setFormData({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        email: '',
        contraseña: '',
        rol: 'Cliente',
      });
    } catch (error) {
      setMessage('Ocurrió un error al registrar el usuario.');
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="apellido_paterno">Apellido Paterno:</label>
          <input
            type="text"
            id="apellido_paterno"
            name="apellido_paterno"
            value={formData.apellido_paterno}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="apellido_materno">Apellido Materno:</label>
          <input
            type="text"
            id="apellido_materno"
            name="apellido_materno"
            value={formData.apellido_materno}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rol">Rol:</label>
          <select id="rol" name="rol" value={formData.rol} onChange={handleChange} required>
            <option value="Cliente">Cliente</option>
            <option value="Vendedor">Vendedor</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;