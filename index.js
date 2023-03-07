const express = require('express');
const mysql = require('mysql');
const multer = require('multer');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    },
    destination: function (req, file, cb) {
        cb(null, "upload")
    }
})

const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: 'localhost',
    database: 'ecommerce_v2',
    user: 'root',
    password: ''
})

const app = express();

//get api
app.get('/', (req, res) => {
    res.send("Welcome to Store API")
})

//POST API
app.post('/category', upload.single('image_url'), (req, res) => {
    const category = req.body;
    const filename = req.file.filename;
    const query = `insert into categorys (category_name, category_image, category_icon, is_enable)
                    values ('${category.name}', '${filename}', '${filename}', false)`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
            res.send("Error! ")
        }
        else res.send("Se guardaron los cambios Correctamente")
    })
})

app.post('/product', upload.single('image_url'), (req, res) => {
    const product = req.body;
    const filename = req.file.filename;
    const query = `insert into products (product_name, product_price, product_image, product_description,
                   product_qty, category_id, brand_id, is_enable)
                    values ('${product.name}', '${product.price}', '${filename}', '${product.description}', 
                    '${product.product_qty}', '${product.category_id}', '${product.brand_id}', true)`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
            res.send("Error! ")
        }
        else res.send("Se guardaron los cambios Correctamente")
    })
})

//get api category
app.get('/category', (req, res) => {
    db.query('select * from categorys;', (err, result) => {
        if (err) {
            res.send("Ocurrio un error buena suerte");
        } else {
            res.send(result)
        }
    })
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

app.listen("5050", () => {
    console.log("listening on port 5050");
    db.connect();
})