import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

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
    setErrors({ ...errors, [e.target.name]: '' });
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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">Registro de Usuario</h2>
        {message && <p className={`mb-4 text-center ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block mb-2 font-bold text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ingresa tu nombre"
            />
            {errors.nombre && <p className="text-red-500 mt-1">{errors.nombre}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="apellido_paterno" className="block mb-2 font-bold text-gray-700">Apellido Paterno</label>
            <input
              type="text"
              id="apellido_paterno"
              name="apellido_paterno"
              value={formData.apellido_paterno}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ingresa tu apellido paterno"
            />
            {errors.apellido_paterno && <p className="text-red-500 mt-1">{errors.apellido_paterno}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="apellido_materno" className="block mb-2 font-bold text-gray-700">Apellido Materno</label>
            <input
              type="text"
              id="apellido_materno"
              name="apellido_materno"
              value={formData.apellido_materno}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ingresa tu apellido materno"
            />
            {errors.apellido_materno && <p className="text-red-500 mt-1">{errors.apellido_materno}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-bold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ingresa tu email"
            />
            {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="contraseña" className="block mb-2 font-bold text-gray-700">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ingresa tu contraseña"
            />
            {errors.contraseña && <p className="text-red-500 mt-1">{errors.contraseña}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="rol" className="block mb-2 font-bold text-gray-700">Rol</label>
            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="Cliente">Cliente</option>
              <option value="Vendedor">Vendedor</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md transition duration-300"
          >
            Registrar
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-bold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;