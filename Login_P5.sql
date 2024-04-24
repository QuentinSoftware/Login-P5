create database login_p5;

create user 'adminP5'@'localhost' identified by 'Developer123!';

grant all privileges on login_p5.* to 'adminP5'@'localhost' with grant option;

use login_p5;

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
