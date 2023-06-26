const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?nome=NodeJs
// Route Params = /curso/2
// Request Body = {nome: 'NodeJs', tipo: 'Backend'}

// CRUD>> 

// localhost: 3000/curso

// Query params
/*server.get('/curso',(req, res) => {
    const nome = req.query.nome;

    return res.json({curso: `Aprendendo ${nome}`})
})*/

// Route Params
/*server.get('/curso/:id',(req, res) => {
    const id = req.params.id;

    return res.json({curso: `id do curso: ${id}`})
})*/

const cursos = ['Node Js', 'Java Script','ReactNative'];

//Middleware Global
server.use((req, res, next) => {
    console.log(`URL CHAMADA: ${req.url}`)

    return next();
});

function checkName(req, res, next){
    if(!req.body.name){
        return res.status(400).json({error: "Nome do curso é obrigatório"});
    }

    return next();
}

function checkIndexCurso(req, res, next){
    const curso = cursos[req.params.index];

    if(!curso){
        return res.status(400).json({error: "O Curso não existe"});
    }

    return next()

}


server.get('/cursos',(req, res) => {
    return res.json(cursos);
})

server.get('/cursos/:index',checkIndexCurso,(req, res) => {
    const { index } = req.params;

    return res.json(cursos[index])
})


// criando um novo curso
server.post('/cursos', checkName ,(req, res) => {
    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
})

// Atualizando um curso
server.put('/cursos/:index', checkName, checkIndexCurso, (req, res) => {
    const {index} = req.params;
    const {name} = req.body;

    cursos[index] = name;

    return res.json(cursos);
})

// Excluindo um curso
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
    const {index} = req.params;

    cursos.splice(index,1);
    return res.json(cursos);
})

server.listen(3000);