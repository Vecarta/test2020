const express = require("express");
const app = express(); // importar express
const mysql = require('mysql'); //importar o mysql
const cors = require('cors');

app.use(cors()); //addicionar cors to allow send dates 
app.use(express.json()); // usar express 

const db = mysql.createConnection({ // iniciar a conexao com o mysql
    user: "MYSQL_USER",
    host: "localhost",
    password: "MYSQL_PASSWORD",
    database: "Node"

})

app.post('/create', (req, res) => { // criar API que enviara os dados na BD

    const name = req.body.name;
    const age = req.body.age;
    const position = req.body.position;
    const country = req.body.country;
    const wage = req.body.wage;

    db.query("INSERT INTO employee (name, age, position, country, wage) VALUES (?,?,?,?,?)", // query insert on mysql db
    [name, age, position, country, wage], 
    (err, result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send("Values Inserted")
        }
    }
    );

    
})

app.get('/employee', (req, res) => { // criar API para pegar os dados Mysql
    db.query("SELECT * FROM employee", (err, result) => {
        if (err){
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
        
})

app.put('/update', (req, res) => { // criae API para fazer update
    const id = req.body.id;
    const wage = req.body.wage;
    db.query("UPDATE employee SET wage = ? WHERE id = ?", [wage, id],
    (err, result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send("Values Updated")
        }
    }
    );

}) 
app.delete('/delete/:id', (req, res) => { // criar API para fazer delete
    const id = req.params.id
    db.query("DELETE FROM employee WHERE id = ?", id,
    (err, result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send("Values DEleted")
        }
    }
    )
})

// configurar o servidor expresss usar a porta 3001
app.listen(3001, () => {
    console.log("your serve is up");
});