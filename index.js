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

app.get("/", (req, res) => {
    res.render('home')
})

//rotas
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
