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

  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>
      <p>Esta página solo es visible para usuarios autenticados.</p>
    </div>
  );
}

export default Inicio;