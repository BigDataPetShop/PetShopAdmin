DROP DATABASE IF EXISTS petshop;
CREATE DATABASE petshop;
USE petshop;

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

CREATE TABLE tipo (
    idTipo INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (idTipo)
);

CREATE TABLE raca (
    idRaca INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (idRaca)
);

CREATE TABLE animal (
    idAnimal INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL,
    idRaca INT NOT NULL,
    idTipo INT NOT NULL,
    Sexo VARCHAR(10) NOT NULL,
    dataNascimento date,
    Vivo BOOLEAN NOT NULL,
    PRIMARY KEY (idAnimal),
    FOREIGN KEY (idTipo) REFERENCES tipo(idTipo),
    FOREIGN KEY (idRaca) REFERENCES raca(idRaca)
);

CREATE TABLE dono (
    idDono INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL,
    RG INT NOT NULL,
    UF VARCHAR(5) NOT NULL,
    Email VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (idDono)
);

CREATE TABLE servico (
    idServico INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (idServico)
);

CREATE TABLE petshop (
    idPetshop INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL UNIQUE,
    Endereco VARCHAR(45) NOT NULL,
    PRIMARY KEY (idPetshop)
);

CREATE TABLE dono_animal (
    idDono INT NOT NULL,
    idAnimal INT NOT NULL,
    PRIMARY KEY (idDono,idAnimal),
    FOREIGN KEY (idDono) REFERENCES dono(idDono),
    FOREIGN KEY (idAnimal) REFERENCES animal(idAnimal)
);
CREATE TABLE petshop_servico (
    idPetshopServico INT NOT NULL AUTO_INCREMENT,
    idPetshop INT NOT NULL,
    idServico INT NOT NULL,
    Preco DEC(10,2) NOT NULL,
    PRIMARY KEY (idPetshopServico ),
    FOREIGN KEY (idPetshop) REFERENCES petshop(idPetshop),
    FOREIGN KEY (idServico) REFERENCES servico(idServico)
);

CREATE TABLE animal_servico (
    idAnimalServico INT NOT NULL AUTO_INCREMENT,
    idAnimal INT NOT NULL,
    idPetshopServico INT NOT NULL,
    Concluido BOOLEAN NOT NULL,
    Agenda date,
    PRIMARY KEY (idAnimalServico),
    FOREIGN KEY (idAnimal) REFERENCES animal(idAnimal),
    FOREIGN KEY (idPetshopServico) REFERENCES petshop_servico(idPetshopServico)
);

DROP PROCEDURE IF EXISTS linkPetshopService;
DELIMITER //
CREATE PROCEDURE createPetshopService (IN serviceName VARCHAR(256),IN petshopID INT(11),IN  Price INT(11))
BEGIN


	SELECT idServico INTO @has_service FROM servico WHERE Nome = serviceName;
    
	IF(@has_service IS NULL) THEN 
		INSERT INTO servico (Nome) VALUES (serviceName);
        INSERT INTO petshop_servico  (idPetshop, idServico,Preco) VALUES (petshopID, (SELECT idServico from servico WHERE Nome=serviceName), Price);
	ELSE 
		INSERT INTO petshop_servico (idPetshop, idServico, Preco) VALUES (petshopID, @has_service, Price);
	END IF;
END//
DELIMITER ;

DROP FUNCTION IF EXISTS sumServices;

DELIMITER //
CREATE FUNCTION sumServices(is_concluido INT, animal_id INT) RETURNS DECIMAL(30, 2)
BEGIN
    DECLARE sum DECIMAL(30, 2);
    SELECT IFNULL(Preco, 0.0) INTO sum FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) WHERE Concluido=is_concluido and idAnimal = animal_id;
    RETURN sum;
END//
DELIMITER ;
