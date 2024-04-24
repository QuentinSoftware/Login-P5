from flask import render_template, request
from app import app, db
from app.models import Usuario, Rol
import hashlib

@app.route('/')
def index():
    return 'Bienvenido a la tienda'

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        nombre = request.form['nombre']
        apellido_paterno = request.form['apellido_paterno']
        apellido_materno = request.form['apellido_materno']
        email = request.form['email']
        contraseña = request.form['contraseña']
        rol_nombre = request.form['rol']
        
        contraseña_hasheada = hashlib.sha256(contraseña.encode()).hexdigest()
        
        nuevo_usuario = Usuario(nombre=nombre, apellido_paterno=apellido_paterno, apellido_materno=apellido_materno, email=email, contraseña=contraseña_hasheada)
        
        rol = Rol.query.filter_by(nombre=rol_nombre).first()
        nuevo_usuario.roles.append(rol)
        
        db.session.add(nuevo_usuario)
        db.session.commit()
        
        return 'Usuario registrado exitosamente'
    
    return render_template('register.html')