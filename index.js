const express = require('express');
const app = express()
const mysql = require('mysql');
const multer = require('multer');
const cors = require("cors");
const path = require('path');
// const bodyParser = require('body-parser');


app.use(cors());
app.use(express.static("./public"))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    database: 'ecommerce_v2',
    user: 'root',
    password: ''

})

// const storage = multer.diskStorage({
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     },
//     destination: function (req, file, cb) {
//         cb(null, './public/images/')
//     }
// })

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

//get api
app.get('/', (req, res) => {
    res.send("Welcome to Store API")
})

//POST API
// app.post('/category', upload.single('image_url'), (req, res) => {
//     const category = req.body;
//     const filename = req.file.filename;
//     const query = `insert into categorys (category_name, category_image, category_icon, is_enable)
//                     values ('${category.name}', '${filename}', '${filename}', false)`;
//     db.query(query, (err, result) => {
//         if (err) {
//             console.log(err)
//             res.send("Error! ")
//         }
//         else res.send("Se guardaron los cambios Correctamente")
//     })
// })

app.post("/category", upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        const category = req.body;
        var imgsrc = 'http://localhost:5050/images/' + req.file.filename
        var insertData = `insert into categorys (category_name, category_image, category_icon, is_enable)
                          values ('${category.name}', '${imgsrc}', '${imgsrc}', true)`;
        db.query(insertData, [imgsrc], (err, result) => {
            if (err) throw err
            console.log("Se subio el archivo")
        })
    }
});


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