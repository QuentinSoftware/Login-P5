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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Limpiar el error del campo modificado
  };

  const validateForm = () => {
    let errors = {};
    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!nombreRegex.test(formData.nombre)) {
      errors.nombre = 'El nombre solo puede contener letras, espacios y acentos.';
    }

    if (!nombreRegex.test(formData.apellido_paterno)) {
      errors.apellido_paterno = 'El apellido paterno solo puede contener letras, espacios y acentos.';
    }

    if (!nombreRegex.test(formData.apellido_materno)) {
      errors.apellido_materno = 'El apellido materno solo puede contener letras, espacios y acentos.';
    }

    if (!emailRegex.test(formData.email)) {
      errors.email = 'El correo electrónico no tiene un formato válido.';
    }

    if (formData.contraseña.length < 8) {
      errors.contraseña = 'La contraseña debe tener al menos 8 caracteres.';
    }

    return errors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const errors = validateForm();
  setErrors(errors);

  if (Object.keys(errors).length === 0) {
    try {
      const response = await axios.post('http://localhost:5000/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage(response.data);
      setFormData({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        email: '',
        contraseña: '',
        rol: 'Cliente',
      });
      setErrors({});
    } catch (error) {
      setMessage('Ocurrió un error al registrar el usuario.');
    }
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
          {errors.nombre && <p>{errors.nombre}</p>}
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
          {errors.apellido_paterno && <p>{errors.apellido_paterno}</p>}
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
          {errors.apellido_materno && <p>{errors.apellido_materno}</p>}
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
          {errors.email && <p>{errors.email}</p>}
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
          {errors.contraseña && <p>{errors.contraseña}</p>}
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
