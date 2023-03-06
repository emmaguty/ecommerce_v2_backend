const express = require('express');

const app = express();

//get api
app.get('/', (req, res)=>{
    res.send("Welcome to Store API")
})

app.listen("5050", ()=>{
    console.log("listening on port 5050")
})