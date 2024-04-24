# Registro de Usuarios con Roles

Los usuarios pueden seleccionar su rol durante el proceso de registro y la información se almacena en una base de datos MySQL.

## Requisitos previos

- Python 3.x
- MySQL Server

## Ejecución de la aplicación

1. Asegúerate de haber ejecutado el script `Login_P5.sql` para crear la base de datos, las tablas y los roles necesarios.

2. Asegúrate de estar en el directorio raíz del proyecto y que el entorno virtual esté activado.

3. Ejecuta el siguiente comando para iniciar la aplicación Flask:
   ```
   flask run
   ```

4. Abre tu navegador web y ve a la dirección `http://localhost:5000` para acceder a la aplicación.

5. Haz clic en el enlace "Registro" o ve directamente a `http://localhost:5000/register` para acceder al formulario de registro de usuarios.

6. Completa el formulario de registro con la información solicitada, selecciona un rol (Vendedor o Cliente) y haz clic en el botón "Registrar".

7. Si el registro se realiza correctamente, verás un mensaje de éxito. Los datos del usuario y el rol asociado se guardarán en la base de datos.