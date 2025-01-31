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

    db.inserir (f, (resultado) => {
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
            id: f[0],
            nome: f[1], 
            valor: f[2],
            tipoFinanca: f[3],
            repeticao: f[4],
            dia: f[5],
            mes: f[6],
            ano: f[7]
        };

    });

    res.json({ financas });
    });

}

app.listen(process.env.PORT, () => {
    console.log('up and running')
});
