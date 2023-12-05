const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require("mysql2")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))

app.get('/ativas', (req, res) => {
    const sql = `
        SELECT * FROM tarefas
        WHERE completa = 0
    `

    conexao.query(sql, (error, dados) => {
        if (error) {
            return console.log(error)
        }

        const tarefas = dados.map((dado) => {
            return {
                id: dado.id,
                descricao:dado.descricao,
                completa: false
            }
        })

        const quantidadeTarefas = tarefas.length

        res.render('ativas', { tarefas, quantidadeTarefas })
    })

})

app.get("/", (req, res) => {
    const sql = 'SELECT * FROM tarefas'

    conexao.query(sql, (error, dados) => {
        if (error) {
            return console.log(error)
        }

        const tarefas = dados.map((dado) => {
            return {
                id: dado.id,
                descricao:dado.descricao,
                completa: dado.completa === 0 ? false : true
            }
        })

        const tarefasAtivas = tarefas.filter((tarefa) => {
            return tarefa.completa == false && tarefa
        })

        const quantidadeTarefasAtivas = tarefasAtivas.length

        res.render('home', { tarefas, quantidadeTarefasAtivas })
    })
})

//rotas
app.post('/completar', (req, res) => {
    const id = req.body.id

    const sql = `
        UPDATE tarefas
        SET completa = '1'
        WHERE id = ${id}
    `

    conexao.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        res.redirect('/')
    })
})

app.post('/descompletar', (req, res) => {
    const id = req.body.id

    const sql = `
        UPDATE tarefas
        SET completa = '0'
        WHERE id = ${id}
    `

    conexao.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        res.redirect('/')
    })
})

app.post('/criar', (req, res) => {
    const descricao = req.body.descricao
    const completa = 0

    const sql = `
        INSERT INTO tarefas(descricao, completa)
        VALUES ('${descricao}', '${completa}')
    `

    conexao.query(sql, (error) => {
        if (error) {
            return console.log(error)

        }

        res.redirect('/')
    })
})

const conexao = mysql.createConnection({
    host: "172.17.0.2",
    user: "root",
    password: "root123",
    database: "todoapp",
    port: 3306
})

conexao.connect((error) => {
    if (error) {
        return console.log(error)
    }

    console.log("Conexão bem sucedida com o banco")

    app.listen(3000, () => {
        console.log("Server is running")
    })
})
