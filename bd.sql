CREATE SCHEMA barbearia;

USE barbearia;

CREATE TABLE admin (
                       id_admin INT PRIMARY KEY AUTO_INCREMENT,
                       email VARCHAR(255) NOT NULL,
                       senha VARCHAR(255) NOT NULL
);

INSERT INTO admin (email, senha)
VALUES ('brunocareca@gmail.com', '123');


CREATE TABLE horarios (
                          id_horario INT PRIMARY KEY AUTO_INCREMENT,
                          horario TIME NOT NULL
);

INSERT INTO horarios (horario)
VALUES
    ('09:00:00'), ('09:30:00'), ('10:00:00'), ('10:30:00'), ('11:00:00'),
    ('11:30:00'), ('12:00:00'), ('12:30:00'), ('13:00:00'), ('13:30:00'),
    ('14:00:00'), ('14:30:00'), ('15:00:00'), ('15:30:00'), ('16:00:00'),
    ('16:30:00'), ('17:00:00'), ('17:30:00'), ('18:00:00'), ('18:30:00'),
    ('19:00:00'), ('19:30:00'), ('20:00:00'), ('20:30:00'), ('21:00:00');

CREATE TABLE servicos (
                          id_servico INT PRIMARY KEY AUTO_INCREMENT,
                          imagem VARCHAR(255),
                          nome VARCHAR(255) NOT NULL,
                          valor DECIMAL(10, 2) NOT NULL,
                          tempo TIME NOT NULL
);

CREATE TABLE servicos_feitos(
                                id_servico_feito INT PRIMARY KEY AUTO_INCREMENT,
                                imagem varchar(255),
                                nome varchar(255) NOT NULL
);


CREATE TABLE agendamento (
                             id_agendamento INT PRIMARY KEY AUTO_INCREMENT,
                             nome_cliente VARCHAR(255) NOT NULL,
                             telefone_cliente VARCHAR(20) NOT NULL,
                             data_agendamento DATE NOT NULL,
                             id_horario INT,
                             id_servico INT,
                             CONSTRAINT fk_horario FOREIGN KEY (id_horario) REFERENCES horarios(id_horario),
                             CONSTRAINT fk_servico FOREIGN KEY (id_servico) REFERENCES servicos(id_servico)
);

