const mysql = require('@mysql/xdevapi');

function obter_conexao() {
  const opcoes = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    schema: process.env.DB_NAME
  }

  let conexao = mysql.getSession(opcoes)

  return conexao
};

async function listar(callback) {
  conexao = await obter_conexao()

  const query = `SELECT * FROM tb_financas`

  conexao
    .sql(query)
    .execute()
    .then((result) => {
      let resultado = result.toArray()[0]
      callback(resultado);
    })
};

async function inserir (financa, callback) {
  const conexao = await obter_conexao();

  const query =
    `INSERT INTO tb_financas (
      nome, 
      valor, 
      tipoFinanca, 
      repeticao, 
      dia, 
      mes, 
      ano) 

    VALUES (
      "${financa.nome}",
      ${financa.valor},
      ${financa.tipoFinanca},
      ${financa.repeticao},
      ${financa.dia},
      ${financa.mes},
      ${financa.ano})`

  conexao
    .sql(query)
    .execute()
    .then((result) => {
      let resultado = result.toArray()[0]
      callback(resultado);
    })
};

async function atualizar (financa, callback) {
  const conexao = await obter_conexao();

  const query =
    `UPDATE 
      tb_financas 
    SET 
      nome = "${financa.nome}",  
      valor = ${financa.valor}, 
      tipoFinanca = ${financa.tipoFinanca},  
      repeticao = ${financa.repeticao}, 
      dia = ${financa.dia}, 
      mes = ${financa.mes}, 
      ano = ${financa.ano}
    WHERE id = ${financa.id}`

  conexao
    .sql(query)
    .execute()
    .then((result) => {
      let resultado = result.toArray()[0]
      callback(resultado);
    })
}

async function deletar (id, callback) {
  const conexao = await obter_conexao();

  const query =
    `DELETE FROM 
      tb_financas 
    WHERE 
      id = ${id}`

  conexao
    .sql(query)
    .execute()
    .then((result) => {
      let resultado = result.toArray()[0]
      callback(resultado);
    })
}

module.exports = {
  listar,
  inserir,
  atualizar,
  deletar
};