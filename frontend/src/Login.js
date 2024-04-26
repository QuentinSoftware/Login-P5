import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: '' }); // Limpiar el error de email al modificar el campo
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: '' }); // Limpiar el error de contraseña al modificar el campo
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
        // Guardar el token en una cookie
        document.cookie = `token=${response.data.token}; path=/`;
        // Redireccionar a la página de inicio
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
    <div className="App">
      <h2>Iniciar sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;
