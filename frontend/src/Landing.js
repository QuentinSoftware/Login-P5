import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Landing() {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const response = await axios.get('http://localhost:5000/check-auth', {
          headers: { 'Authorization': token }
        });
        if (response.data.message === 'Autenticación exitosa') {
          window.location.href = '/inicio';
        }
      } catch (error) {
        // El usuario no está autenticado, no es necesario hacer nada
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col justify-center items-center">
      <div className="max-w-lg px-6 py-12 bg-white rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Bienvenido a mi aplicación</h1>
        <p className="text-xl mb-8 text-center text-gray-600">Para ver el contenido, por favor inicia sesión o regístrate.</p>
        <div className="flex justify-center space-x-4">
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out">
            Iniciar sesión
          </Link>
          <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out">
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;