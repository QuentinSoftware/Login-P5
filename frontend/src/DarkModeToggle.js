import React, { useEffect, useState } from 'react';
import { IoMoonSharp, IoSunnySharp } from 'react-icons/io5';

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement; // Accedemos al elemento raíz del documento
    if (darkMode) {
      root.classList.add('dark'); // Añade la clase 'dark' al raíz para activar el modo oscuro
    } else {
      root.classList.remove('dark'); // Elimina la clase 'dark' para desactivar el modo oscuro
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-1 w-12 h-6 flex items-center bg-gray-300 rounded-full dark:bg-gray-700 transition-colors duration-300"
    >
      <span className={`transform transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}>
        {darkMode ? (
          <IoSunnySharp className="text-yellow-400 text-lg" />
        ) : (
          <IoMoonSharp className="text-gray-300 text-lg" />
        )}
      </span>
    </button>
  );
}

export default DarkModeToggle;
