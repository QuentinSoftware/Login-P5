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
        {/* Agrega los campos del formulario de registro */}
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
        {/* Agrega los demás campos del formulario */}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;