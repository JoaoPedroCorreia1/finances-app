USE projeto_include;

CREATE DATABASE financas_database;

USE financas_database;

CREATE TABLE tb_financas(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(200) NOT NULL,
valor INT NOT NULL,

tipoFinanca INT NOT NULL,
repeticao INT NOT NULL, 

dia INT NOT NULL,
mes INT NOT NULL,
ano INT NOT NULL
);

-- inserir financa
INSERT INTO tb_financas (
nome, 
valor,
tipoFinanca,
repeticao,
dia,
mes,
ano) VALUES (
"Despesa Casa", 
-500,
1,
1,
6,
0,
0);

-- mostrar grafico
SELECT * FROM tb_financas;
-- SELECT nome, tipoFinanca FROM tb_financas;

-- atualizar financa
-- UPDATE tb_financas SET finalizada = TRUE WHERE id = 1;