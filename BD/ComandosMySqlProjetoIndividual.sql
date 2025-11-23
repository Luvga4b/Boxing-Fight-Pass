CREATE DATABASE boxing_fight_pass;
USE boxing_fight_pass;

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL
);

CREATE TABLE Perfil (
    idPerfil INT PRIMARY KEY AUTO_INCREMENT,
    nomeCompleto VARCHAR(100),
    dataNascimento DATE,
    fkUsuario INT UNIQUE,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Categoria (
    idCategoria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    pesoMaximo DECIMAL(5,2)
);

CREATE TABLE Lutador (
    idLutador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    cartel VARCHAR(20),
    fkCategoria INT,
    FOREIGN KEY (fkCategoria) REFERENCES Categoria(idCategoria)
);

CREATE TABLE Favoritos (
    idFavorito INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    fkLutador INT,
    dataFavoritado DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (fkLutador) REFERENCES Lutador(idLutador)
);
