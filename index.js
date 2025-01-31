require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

const db = require('./db');

// funções publicas

app.get('/financas', (req, res) => {
  obter_financas(req, res);
});

app.post('/financas', (req, res) => {
  const f = req.body;

  db.inserir(f, (resultado) => {
    obter_financas(req, res);
  });

})

app.put('/financas', (req, res) => {

  db.atualizar(req.body, (resultado) => {
    obter_financas(req, res);
  });

})

app.delete('/financas', (req, res) => {

  db.deletar(req.body, (resultado) => {
    obter_financas(req, res);
  });

})

// funções privadas

const obter_financas = (req, res) => {

  db.listar((financas) => {

    financas = financas.map((f) => {
      return {
        id: f["id"],
        nome: f["nome"],
        valor: f["valor"],
        tipoFinanca: f["tipoFinanca"],
        repeticao: f["repeticao"],
        dia: f["dia"],
        mes: f["mes"],
        ano: f["ano"]
      };
    })

    res.json( {financas} );
  });

}

app.listen(process.env.PORT, () => {
  console.log('up and running');
});
