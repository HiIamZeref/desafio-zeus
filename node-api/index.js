const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 8080;

// Conexão com o banco de dados
mongoose.connect("mongodb+srv://felipegaby:12345@cluster0.tet07xv.mongodb.net/zeus")

// Definição do schema e do model
const DadosSchema = new mongoose.Schema({
    nome: String
}, { versionKey: false });

const dadosModel = mongoose.model('dados', DadosSchema);


// App setup
app.use(express.json());
app.use(cors());
app.listen(
    PORT,
    () => console.log(`Servidor rodando na porta ${PORT}`)
);

// Rotas
// Rota main
app.get('/', (req, res) => {
    console.log('Rota acessada!');
    res.status(200).send({
        'message': 'Hello World!'
    });


});

// Rota para inserção de um usuario novo
// app.post('/users/:id', (req, res) => {
//     console.log("POST sendo feito...");

//     const { id } = req.params;
//     const { nome } = req.body;

//     if (!nome) {
//         res.status(418).send({
//             'status': 'error',
//             'message': 'Preciso de um nome de usuário!'
//         });
//     }

//     res.send({
//         'message': `Usuário com nome ${nome} e id ${id} foi criado!`
//     })

// });

// Arquitetura backend: MVC (procurar depois para implementar)
// CRUD : Create, Read, Update, Delete


// Rotas banco de dados
// Rota para pegar todos os dados
app.get('/dados', async (req, res) => {
    console.log('Rota "/dados" alteracoes (GET) acessada!');

    try {
        const data = await dadosModel.find({});
        res.status(200).send(data);
        console.log("Dados enviados com sucesso!");
    } catch (err) {
        res.status(500).send({
            'status': 'error',
            'message': err
        });

        console.log("Erro ao enviar dados!");
    }


});

// Rota para inserir um dado
app.post('/dados', async (req, res) => {
    console.log('Rota "/dados" (POST) acessada!');

    const { nome } = req.body;

    if (!nome) {
        res.status(418).send({
            'status': 'error',
            'message': 'Preciso de um nome de usuário!'
        });
    }

    try {
        const data = new dadosModel({ nome });
        await data.save();
        res.status(201).send(data);
        console.log("Dado inserido com sucesso!");
    } catch (err) {
        res.status(500).send({
            'status': 'error',
            'message': err
        });

        console.log("Erro ao inserir dado!");
    }

});

// Rota para deletar um dado baseado no nome
app.delete('/dados', async (req, res) => {
    console.log('Rota "/dados" (DELETE) acessada!');

    const { nome } = req.body;

    if (!nome) {
        res.status(418).send({
            'status': 'error',
            'message': 'Preciso de um nome de usuário!'
        });
    }

    try {
        const data = await dadosModel.deleteOne({ nome });
        [data.status, data.message] = ['OK', 'Dado deletado com sucesso!'];

        res.status(200).send(data);
        console.log("Dado deletado com sucesso!");
    } catch (err) {
        res.status(500).send({
            'status': 'error',
            'message': err
        });

        console.log("Erro ao deletar dado!");
    }

});

// Rota para atualizar um dado baseado no nome
app.patch('/dados', async (req, res) => {
    console.log("Rota '/dados' (POST) acessada!");

    const { nome } = req.body;
    const { novoNome } = req.body;

    if (!nome || !novoNome) {
        res.status(418).send({
            'status': 'error',
            'message': 'Preciso de um nome de usuário e um novo nome!'
        });
    }

    try {
        const data = await dadosModel.updateOne({ nome }, { nome: novoNome });
        [data.status, data.message] = ['OK', 'Dado atualizado com sucesso!'];

        res.status(200).send(data);
        console.log("Dado atualizado com sucesso!");
    } catch (err) {
        res.status(500).send({
            'status': 'error',
            'message': err
        });

        console.log("Erro ao atualizar dado!");
    }




});


