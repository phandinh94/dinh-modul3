// ------------- Ex1 ----------------------
const express = require('express')
const morgan = require('morgan')
const fs = require("node:fs")
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// ------------- Ex2 ----------------------
app.get('/api/v1/todos', (req, res)=> {
    fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
        if (err){ 
            res.status(500).json(err)
        } else {
            let arrTodos = JSON.parse(data);
            res.status(200).json(arrTodos)
        }
    })
})

app.get('/api/v1/todos/:id', (req, res) => {
    fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
        if (err) {
            res.status(500).json(err)
        } else {
            let arrTodos = JSON.parse(data);
            let todo = arrTodos.find((e) => e.id == req.params.id)
            res.status(200).json(todo)
        }
    })
})

app.post('/api/v1/todos', (req, res) => {
    fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
        if (err) {
            res.status(500).json(err)
        } else {
            let arrTodos = JSON.parse(data);
            let todo = arrTodos.find((e) => e.title == req.body.title)        
            if (!todo) {
                arrTodos.push(req.body);
                fs.writeFile(`${__dirname}/dev-data/todos.json`, JSON.stringify(arrTodos), (err) => {
                        if (err) {
                            res.status(500).json(err)
                        } else {
                            res.status(200).json("Create successfully")
                        }
                    })
            } else {
                res.status(200).json("Todo already exists")
            }
        }
    })
})

app.put('/api/v1/todos/:id', (req, res) => {
    fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
            let arrTodos = JSON.parse(data);
            let todo = arrTodos.findIndex((e) => e.id == req.body.id)          
            if (todo !== -1 ) {
                let newTodo = {
                    ...req.body,
                    userId: Number(req.body.userId),
                    id : Number(req.body.id)
                }
                arrTodos.splice(todo, 1, newTodo);
                fs.writeFile(`${__dirname}/dev-data/todos.json`, JSON.stringify(arrTodos), (err) => {
                        if (err) {
                            res.status(500).json(err)
                        } else {
                            res.status(200).json("Update successfully")
                        }
                    })
            } else {
                res.status(200).json("Todo not found")
            }
        }
    )
})

app.delete('/api/v1/todos/:id', (req, res) => {
    fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
        if (err) {
            res.status(500).json(err)
        } else {
            let arrTodos = JSON.parse(data);
            let todo = arrTodos.findIndex((e) => e.id == req.body.id)          
            if (todo != -1) {
                arrTodos.splice(todo, 1);
                fs.writeFile(`${__dirname}/dev-data/todos.json`, JSON.stringify(arrTodos), (err) => {
                        if (err) {
                            res.status(500).json(err)
                        } else {
                            res.status(200).json("Delete successfully")
                        }
                    })
            } else {
                res.status(200).json("Todo not found")
            }
        }
    })
})

// ------------- Ex4 ----------------------
app.use(express.static('public'))
app.get('/', (req, res)=>{
    re
})



app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
})



