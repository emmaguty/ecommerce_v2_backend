const express = require('express');
const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: process.env.HOST,
//     database: process.env.DB,
//     user: process.env.USER,
//     password: process.env.PASS,
// })

const db = mysql.createConnection({
    host: 'localhost',
    database: 'ecommerce_v2',
    user: 'root',
    password:''
})

const app = express();

//get api
app.get('/', (req, res) => {
    res.send("Welcome to Store API")
})

//get api product
app.get('/products', (req, res) => {
    db.query('select * from products;', (err, result) => {
        if (err) {
            res.send("Ocurrio un error, buena suerte");
        } else {
            res.send(result)
        }
    })
})

//get api category
app.get('/category', (req, res) => {
    db.query('select * from category;', (err, result) => {
        if (err) {
            res.send("Ocurrio un error buena suerte");
        } else {
            res.send(result)
        }
    })
})

app.listen("5050", () => {
    console.log("listening on port 5050");
    db.connect();
})