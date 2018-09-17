USE petshop;

INSERT INTO tipo VALUES (1,"Cachorro");
INSERT INTO tipo VALUES (2,"Gato");
INSERT INTO tipo VALUES (3,"Peixe");

INSERT INTO raca VALUES (1,"Yorkshire");
INSERT INTO raca VALUES (2,"Bulldog");
INSERT INTO raca VALUES (3,"Siames");

INSERT INTO animal VALUES (1,"Bob",1,1,"MASCULINO",'2017-05-13');
INSERT INTO animal VALUES (2,"Duque",2,1,"MASCULINO",'2018-03-3');
INSERT INTO animal VALUES (3,"Lia",3,2,"FEMININO",'2015-10-26');
INSERT INTO animal VALUES (4,"Dylan",1,1,"MASCULINO",'2017-05-13');


INSERT INTO dono VALUES (1,"Tirta",378740064,"SP","edu.tirta@gmail.com");
INSERT INTO dono VALUES (2,"Borba",123467890,"SP","borba@gmail.com");
INSERT INTO dono VALUES (3,"Gabs",1234567891,"MG","gabs@gmail.com");
INSERT INTO dono VALUES (4,"Graicer",1234567892,"SP","graicer@gmail.com");
INSERT INTO dono VALUES (5,"Curti",1234567893,"SP","curti@gmail.com");

INSERT INTO servico VALUES (1,"Banho");
INSERT INTO servico VALUES (2,"Tosa");
INSERT INTO servico VALUES (3,"Banho e Tosa");
INSERT INTO servico VALUES (4,"Dog Walker");

INSERT INTO produto VALUES (1,"Osso");
INSERT INTO produto VALUES (2,"Racao");
INSERT INTO produto VALUES (3,"Bola");

INSERT INTO petshop VALUES (1,"Mais Caes", "Vila Olimpia");
INSERT INTO petshop VALUES (2,"Vida Animal", "Jardins");

INSERT INTO dono_animal VALUES (1,1,1);
INSERT INTO dono_animal VALUES (2,1,0);
INSERT INTO dono_animal VALUES (3,2,1);
INSERT INTO dono_animal VALUES (4,3,0);
INSERT INTO dono_animal VALUES (5,4,1);
INSERT INTO dono_animal VALUES (5,3,1);

INSERT INTO animal_servico VALUES (1,1,1,'2018-08-18');
INSERT INTO animal_servico VALUES (4,3,0,'2018-08-30');
INSERT INTO animal_servico VALUES (2,4,0,'2018-09-10');


INSERT INTO animal_produto VALUES (3,2);
INSERT INTO animal_produto VALUES (1,1);
INSERT INTO animal_produto VALUES (1,3);


INSERT INTO petshop_produto VALUES (1,1,8.50);
INSERT INTO petshop_produto VALUES (1,3,10.0);
INSERT INTO petshop_produto VALUES (2,2,50.75);


INSERT INTO petshop_servico VALUES (1,1,20);
INSERT INTO petshop_servico VALUES (1,2,15);
INSERT INTO petshop_servico VALUES (1,3,32.5);
INSERT INTO petshop_servico VALUES (2,1,18);
INSERT INTO petshop_servico VALUES (2,2,17);
INSERT INTO petshop_servico VALUES (2,4,40);

