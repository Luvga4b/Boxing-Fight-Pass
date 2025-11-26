CREATE DATABASE boxing_analytics;
USE boxing_analytics;

-- 1. CATEGORIA (Para organizar os lutadores)
CREATE TABLE Categoria (
    idCategoria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    pesoMaximo DECIMAL(5,2)
);

-- 2. USUARIO (Cadastro e Login)
CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100), -- Aumentei para caber hash se precisar
    dtCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. LUTADOR (Dados principais)
CREATE TABLE Lutador (
    idLutador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    apelido VARCHAR(100),
    pais VARCHAR(50),
    urlImagem VARCHAR(500),
    fkCategoria INT,
    FOREIGN KEY (fkCategoria) REFERENCES Categoria(idCategoria)
);

-- 4. ATRIBUTO (Dados do Radar - 1:1 com Lutador)
CREATE TABLE Atributo (
    idAtributo INT PRIMARY KEY AUTO_INCREMENT,
    forca INT,
    velocidade INT,
    resistencia INT,
    tecnica INT,
    defesa INT,
    fkLutador INT,
    FOREIGN KEY (fkLutador) REFERENCES Lutador(idLutador)
);

-- 5. LUTA (Para o gráfico de Lutas Favoritas)
CREATE TABLE Luta (
    idLuta INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    ano INT,
    resultadoTexto VARCHAR(50)
);

-- 6. REGISTROJOGO (Histórico do Jogo do Carro)
CREATE TABLE RegistroJogo (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    resultado VARCHAR(50),
    pontuacao INT,
    dataJogo DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);

-- 7. FAVORITOLUTADOR (N:N Usuario x Lutador)
CREATE TABLE FavoritoLutador (
    idFavoritoLuta INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    fkLutador INT,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (fkLutador) REFERENCES Lutador(idLutador)
);

-- 8. FAVORITOLUTA (N:N Usuario x Luta)
CREATE TABLE FavoritoLuta (
    idFavorito INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    fkLuta INT,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (fkLuta) REFERENCES Luta(idLuta)
);