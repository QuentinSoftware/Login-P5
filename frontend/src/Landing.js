import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a mi aplicación</h1>
      <p className="text-xl mb-8">Para ver el contenido, por favor inicia sesión o regístrate.</p>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Iniciar sesión
        </Link>
        <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Registrarse
        </Link>
      </div>
    </div>
  );
}

export default Landing;