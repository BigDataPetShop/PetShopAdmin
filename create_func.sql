USE petshop;

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

DROP TRIGGER IF EXISTS trigDelete_petshopServico;

DELIMITER //
CREATE TRIGGER trigDelete_petshopServico
BEFORE DELETE ON petshop_servico
FOR EACH ROW
BEGIN
    DELETE FROM animal_servico
        WHERE idPetshopServico = old.idPetshopServico;
END //
DELIMITER ;