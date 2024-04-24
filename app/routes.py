from flask import render_template, request
from app import app, db
from app.models import Usuario, Rol
import hashlib

@app.route('/')
def index():
    """
    Ruta principal de la aplicación.
    """
    return 'Bienvenido a mi aplicación Flask'

@app.route('/register', methods=['GET', 'POST'])
def register():
    """
    Ruta para el registro de usuarios.
    """
    if request.method == 'POST':
        # Obtener los datos del formulario
        nombre = request.form['nombre']
        apellido_paterno = request.form['apellido_paterno']
        apellido_materno = request.form['apellido_materno']
        email = request.form['email']
        contraseña = request.form['contraseña']
        rol_nombre = request.form['rol']
        
        # Hashear la contraseña
        contraseña_hasheada = hashlib.sha256(contraseña.encode()).hexdigest()
        
        # Crea un nuevo usuario
        nuevo_usuario = Usuario(nombre=nombre, apellido_paterno=apellido_paterno, apellido_materno=apellido_materno, email=email, contraseña=contraseña_hasheada)
        
        # El rol seleccionado por el usuario
        rol = Rol.query.filter_by(nombre=rol_nombre).first()
        
        # Asigna el rol al nuevo usuario
        nuevo_usuario.roles.append(rol)
        
        # Agrega el nuevo usuario a la sesión de la base de datos
        db.session.add(nuevo_usuario)
        
        # Guarda los cambios en la base de datos
        db.session.commit()
        
        return 'Usuario registrado exitosamente'
    
    return render_template('register.html')