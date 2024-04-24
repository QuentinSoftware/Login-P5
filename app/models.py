from app import db

class Usuario(db.Model):
    """
    Modelo que representa la tabla 'usuarios' en la base de datos.
    """
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido_paterno = db.Column(db.String(50), nullable=False)
    apellido_materno = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    contraseña = db.Column(db.String(255), nullable=False)
    fecha_creacion = db.Column(db.DateTime, default=db.func.current_timestamp())
    fecha_actualizacion = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    
    # Relación muchos a muchos con la tabla 'roles' a través de la tabla 'usuarios_roles'
    roles = db.relationship('Rol', secondary='usuarios_roles', backref=db.backref('usuarios', lazy='dynamic'))

class Rol(db.Model):
    """
    Modelo que representa la tabla 'roles' en la base de datos.
    """
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(30), unique=True, nullable=False)
    descripcion = db.Column(db.String(100))

class UsuarioRol(db.Model):
    """
    Modelo que representa la tabla intermedia 'usuarios_roles' en la base de datos.
    """
    __tablename__ = 'usuarios_roles'
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), primary_key=True)
    rol_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)