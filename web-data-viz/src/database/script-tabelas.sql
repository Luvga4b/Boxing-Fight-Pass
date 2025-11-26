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
    senha VARCHAR(100), 
    dtCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    isAdm BOOLEAN DEFAULT FALSE
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

select * from FavoritoLuta;

 SELECT l.nome, count(f.idFavoritoLuta) as votos
        FROM Lutador l
        LEFT JOIN FavoritoLutador f ON l.idLutador = f.fkLutador
        GROUP BY l.idLutador, l.nome;

        
        -- 1. Inserir Categorias
INSERT INTO Categoria (nome, pesoMaximo) VALUES 
('Peso Pesado', 120.00), 
('Peso Médio', 72.50);

-- 2. Inserir Lutadores (Para o Gráfico de Popularidade)
INSERT INTO Lutador (nome, apelido, pais, urlImagem, fkCategoria) VALUES 
('Mike Tyson', 'Iron Mike', 'EUA', 'https://cdn.fightfax.com/profiles_avatar/pictures/mike-tyson-991330-1730802287.png', 1),
('Muhammad Ali', 'The Greatest', 'EUA', 'https://cdn.britannica.com/86/192386-050-D7F3126D/Muhammad-Ali-American.jpg', 1),
('Evander Holyfield', 'The Real Deal', 'EUA', 'https://static.wixstatic.com/media/2af6dc_16b0ede7e09a4b1487e92206a9348825~mv2.png', 1),
('Joe Frazier', 'Smokin Joe', 'EUA', 'https://cdn.britannica.com/93/225193-050-73961219/American-boxer-Joe-Frazier-1969.jpg', 1);

-- 3. Inserir Lutas (Para o Gráfico de Engajamento)
INSERT INTO Luta (titulo, ano, resultadoTexto) VALUES 
('Tyson vs Holyfield', 1996, 'Vitoria Holyfield'),
('Ali vs Frazier', 1975, 'Vitoria Ali');
INSERT INTO Usuario (nome, email, senha, isAdm)
VALUES ('adm', 'adm@gmail.com', '12345678', TRUE);
