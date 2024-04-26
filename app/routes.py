from flask import render_template, request, jsonify
from app import app, db
from app.models import Usuario, Rol
from flask_cors import CORS
import hashlib

# Habilitar CORS para todas las rutas
CORS(app)

@app.route('/')
def index():
    """
    Ruta principal de la aplicación.
    """
    return 'Bienvenido a mi aplicación Flask'

@app.route('/register', methods=['POST'])
def register():
    """
    Ruta para el registro de usuarios.
    """
    if request.method == 'POST':
        # Obtener los datos del formulario
        nombre = request.json['nombre']
        apellido_paterno = request.json['apellido_paterno']
        apellido_materno = request.json['apellido_materno']
        email = request.json['email']
        contraseña = request.json['contraseña']
        rol_nombre = request.json['rol']
        
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
    
    return 'Usuario registrado exitosamente'
    
@app.route('/login', methods=['POST'])
def login():
    """
    Ruta para el inicio de sesión de usuarios.
    """
    if request.method == 'POST':
        email = request.json['email']
        contraseña = request.json['password']

        # Hashear la contraseña ingresada
        contraseña_hasheada = hashlib.sha256(contraseña.encode()).hexdigest()

        # Verificar si el usuario existe en la base de datos
        usuario = Usuario.query.filter_by(email=email).first()

        if usuario:
            if usuario.contraseña == contraseña_hasheada:
                # Si el usuario existe y la contraseña es correcta, generar un token
                token = f"token-{usuario.id}"
                return jsonify({"message": "Usuario Logeado correctamente", "token": token})
            else:
                return jsonify({"message": "Contraseña incorrecta. Por favor, inténtalo de nuevo."})
        else:
            return jsonify({"message": "El usuario no existe. Por favor, regístrate primero."})

    return jsonify({"message": "Método no permitido"}), 405


@app.route('/check-auth', methods=['GET'])
def check_auth():
    token = request.headers.get('Authorization')
    if token:
        usuario_id = token.replace("token-", "")
        usuario = Usuario.query.get(usuario_id)
        if usuario:
            return jsonify({"message": "Autenticación exitosa"})
    return jsonify({"message": "No autenticado"}), 401
