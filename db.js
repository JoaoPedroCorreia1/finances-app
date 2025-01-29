const mysql = require('mysql2');

const obterConexao = () => {

    return mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

};

const listar = (callback) => {

    const conexao = obterConexao();

    conexao.query(
    'SELECT * from tb_financas',
    (erro, resultado) => {
    // console.log(`resultado: ${JSON.stringify(resultado)}`);
    callback(resultado);
    });

};

const inserir = (financa, callback) => {

    const conexao = obterConexao();

    conexao.execute(
    `INSERT INTO tb_financas (
        nome, 
        valor, 
        tipoFinanca, 
        repeticao, 
        dia, 
        mes, 
        ano) 

        VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
        financa.nome, 
        financa.valor,
        financa.tipoFinanca,
        financa.repeticao,
        financa.dia,
        financa.mes,
        financa.ano
    ],

    (erro, resultado) => {
      //   console.log(`resultado: ${JSON.stringify(resultado)}`);
      callback(resultado);
    }

    );
};

const atualizar = (financa, callback) => {
    const conexao = obterConexao();
    conexao.execute(
    `UPDATE tb_financas SET 
    nome = ?,  
    valor = ?, 
    tipoFinanca = ?,  
    repeticao = ?, 
    dia = ?, 
    mes = ?, 
    ano = ?
    WHERE id = ?`,
    [
        financa.nome, 
        financa.valor,
        financa.tipoFinanca,
        financa.repeticao,
        financa.dia,
        financa.mes,
        financa.ano,
        financa.id
    ],

    (erro, resultado) => {
        callback(resultado);
    }

    );
};

module.exports = {
    listar,
    inserir,
    atualizar
};