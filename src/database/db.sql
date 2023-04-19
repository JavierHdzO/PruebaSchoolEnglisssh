
CREATE DATABASE test;

USE test;

CREATE TABLE Usuarios(
    UsuarioId INTEGER PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100),
    Apellidos VARCHAR(100),
    Usuario VARCHAR(50),
    Contrasena VARCHAR(100)
)