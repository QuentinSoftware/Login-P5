import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: '' });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: '' });
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      errors.email = 'El correo electrónico no tiene un formato válido.';
    }

    if (password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/login', { email, password });
        if (response.data.message === 'Usuario Logeado correctamente') {
          document.cookie = `token=${response.data.token}; path=/`;
          window.location.href = '/inicio';
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">Iniciar sesión</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-bold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ingresa tu email"
            />
            {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-bold text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ingresa tu contraseña"
            />
            {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md transition duration-300"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-bold">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;