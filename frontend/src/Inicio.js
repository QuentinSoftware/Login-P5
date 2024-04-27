import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Inicio() {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const response = await axios.get('http://localhost:5000/check-auth', {
          headers: { 'Authorization': token }
        });
        if (response.data.message !== 'Autenticación exitosa') {
          window.location.href = '/';
        }
      } catch (error) {
        window.location.href = '/';
      }
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a la página de inicio</h1>
      <p className="text-xl mb-8">Esta página solo es visible para usuarios autenticados.</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Inicio;