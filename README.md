# Proyecto de Login con Flask y React

Este proyecto es una aplicación web que implementa un sistema de registro y login de usuarios utilizando Flask como backend y React como frontend. La aplicación permite a los usuarios registrarse, iniciar sesión y acceder a una página de inicio protegida.

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

- Python 3.x
- Node.js
- npm (administrador de paquetes de Node.js)
- MySQL (o cualquier otro sistema de gestión de bases de datos compatible)
- Tambien se usaron otras bibliotecas, como Tailwind CSS.

## Configuración de la base de datos

1. (Puedes copiar todo el script SQL que esta en Login_P5.sql y ejecutarlo en MySQL workbrech para mas rápido) Crea una base de datos MySQL llamada `login_p5`.

2. Crea un usuario con permisos para acceder a la base de datos:

   ```sql
   CREATE USER 'adminP5'@'localhost' IDENTIFIED BY 'Developer123!';
   GRANT ALL PRIVILEGES ON login_p5.* TO 'adminP5'@'localhost' WITH GRANT OPTION;
   ```

3. Ejecuta el siguiente script SQL para crear las tablas necesarias y insertar datos de ejemplo:

   ```sql
   USE login_p5;

   -- La tabla 'usuarios'
   CREATE TABLE usuarios (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nombre VARCHAR(50) NOT NULL,
       apellido_paterno VARCHAR(50) NOT NULL,
       apellido_materno VARCHAR(50) NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       contraseña VARCHAR(255) NOT NULL,
       fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );

   -- La tabla 'roles'
   CREATE TABLE roles (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nombre VARCHAR(30) UNIQUE NOT NULL,
       descripcion VARCHAR(100)
   );

   -- Se insertan los roles 'Vendedor' y 'Cliente' junto con sus descripciones
   INSERT INTO roles (nombre, descripcion) VALUES ('Vendedor', 'Usuario que puede gestionar productos y ver sus ventas');
   INSERT INTO roles (nombre, descripcion) VALUES ('Cliente', 'Usuario que puede realizar compras y ver su historial de pedidos');

   -- La tabla 'usuarios_roles'
   CREATE TABLE usuarios_roles (
       usuario_id INT NOT NULL,
       rol_id INT NOT NULL,
       PRIMARY KEY (usuario_id, rol_id),
       FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
       FOREIGN KEY (rol_id) REFERENCES roles (id) ON DELETE CASCADE
   );

   -- Insertar usuario de prueba
   INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, email, contraseña) VALUES ('Juan', 'Perez', 'Lopez', 'juan.perez@example.com', 'Password123!');

   -- Asignar el rol de 'Cliente' al usuario de prueba (asumiendo que el id de 'Cliente' es 2)
   INSERT INTO usuarios_roles (usuario_id, rol_id) VALUES (LAST_INSERT_ID(), 2);
   ```

   Este script crea las tablas `usuarios`, `roles` y `usuarios_roles`, inserta los roles 'Vendedor' y 'Cliente', y agrega un usuario de prueba con el correo electrónico 'juan.perez@example.com' y la contraseña 'Password123!'.

## Configuración del backend

1. Navega hasta la carpeta del backend en tu proyecto.

2. Crea y activa un entorno virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # para Unix/Linux
   venv\Scripts\activate  # para Windows
   ```

3. Instala las dependencias del backend o lo que yo hice fue que usé directamente el ambiente virtual que ya estaba.
   ```bash
   pip install -r requirements.txt
   ```

4. La conexíon a la base de datos es importante hacerla para poder notar cuales usuarios se registran, o ver los usuarios existentes.

5. Inicia el servidor backend:
   ```bash
   python -m flask run
   ```
   La aplicación backend estará disponible en `http://localhost:5000`.
   


## Configuración del frontend

1. Navega hasta la carpeta del frontend en tu proyecto.

2. Instala las dependencias del frontend:
   ```bash
   npm install
   ```

3. Inicia la aplicación frontend, posicionandote en la ruta  la altura de la carpeta de react, en este caso se llama frontend:
   ```bash
   npm start
   ```

   La aplicación frontend estará disponible en `http://localhost:3000`.

## Uso de la aplicación

1. Abre tu navegador web y ve a `http://localhost:3000` para acceder a la aplicación.

2. En la página de inicio, tendrás la opción de iniciar sesión o registrarte.

3. Si eres un nuevo usuario, haz clic en "Registrarse" y completa el formulario de registro con tu información personal, incluyendo un correo electrónico válido y una contraseña.

4. Una vez registrado, inicia sesión con tu correo electrónico y contraseña.

5. Después de iniciar sesión correctamente, serás redirigido a la página de inicio protegida.

6. Para cerrar sesión, haz clic en el botón "Cerrar sesión" en la página de inicio.

## Usuario de prueba

Si deseas iniciar sesión con un usuario de prueba, puedes utilizar las siguientes credenciales:

- Correo electrónico: juan.perez@example.com
- Contraseña: Password123!

Este usuario tiene asignado el rol de 'Cliente'.
