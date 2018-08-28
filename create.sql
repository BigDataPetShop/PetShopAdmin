DROP DATABASE IF EXISTS petshop;
CREATE DATABASE petshop;
USE petshop;


CREATE TABLE tipo (
    idTipo INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL,
    PRIMARY KEY (idTipo)
);

CREATE TABLE raca (
    idRaca INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL,
    PRIMARY KEY (idRaca)
);

CREATE TABLE animal (
    idAnimal INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL,
    idRaca INT NOT NULL,
    idTipo INT NOT NULL,
    Sexo VARCHAR(10) NOT NULL,
    dataNascimento date,
    PRIMARY KEY (idAnimal),
    FOREIGN KEY (idTipo) REFERENCES tipo(idTipo),
    FOREIGN KEY (idRaca) REFERENCES raca(idRaca)
);

CREATE TABLE dono (
    idDono INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL,
    RG INT NOT NULL,
    UF VARCHAR(5) NOT NULL,
    Email VARCHAR(45) NOT NULL,
    PRIMARY KEY (idDono)
);

CREATE TABLE servico (
    idServico INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL,
    PRIMARY KEY (idServico)
);

CREATE TABLE produto (
    idProduto INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL,
    PRIMARY KEY (idProduto)
);

CREATE TABLE petshop (
    idPetshop INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL,
    Endereco VARCHAR(45) NOT NULL,
    PRIMARY KEY (idPetshop)
);

CREATE TABLE dono_animal (
    idDono INT NOT NULL,
    idAnimal INT NOT NULL,
    Principal BOOLEAN NOT NULL,
    PRIMARY KEY (idDono,idAnimal),
    FOREIGN KEY (idDono) REFERENCES dono(idDono),
    FOREIGN KEY (idAnimal) REFERENCES animal(idAnimal)
);

CREATE TABLE animal_servico (
    idAnimal INT NOT NULL,
    idServico INT NOT NULL,
    Concluido BOOLEAN NOT NULL,
    Agenda date,
    PRIMARY KEY (idAnimal,idServico),
    FOREIGN KEY (idAnimal) REFERENCES animal(idAnimal),
    FOREIGN KEY (idServico) REFERENCES servico(idServico)
);

CREATE TABLE animal_produto (
    idAnimal INT NOT NULL,
    idProduto INT NOT NULL,
    PRIMARY KEY (idAnimal,idProduto),
    FOREIGN KEY (idAnimal) REFERENCES animal(idAnimal),
    FOREIGN KEY (idProduto) REFERENCES produto(idProduto)
);

CREATE TABLE petshop_produto (
    idPetshop INT NOT NULL,
    idProduto INT NOT NULL,
    Preco DEC(10,2) NOT NULL,
    PRIMARY KEY (idPetshop,idProduto),
    FOREIGN KEY (idPetshop) REFERENCES petshop(idPetshop),
    FOREIGN KEY (idProduto) REFERENCES produto(idProduto)
);

CREATE TABLE petshop_servico (
    idPetshop INT NOT NULL,
    idServico INT NOT NULL,
    Preco DEC(10,2) NOT NULL,
    PRIMARY KEY (idPetshop,idServico),
    FOREIGN KEY (idPetshop) REFERENCES petshop(idPetshop),
    FOREIGN KEY (idServico) REFERENCES servico(idServico)
);
