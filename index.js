const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
require("dotenv").config()

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql2.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});

app.get("/gq/:category", (req, res) => {
    const category = req.params.category;
    let sql = "SELECT * FROM quote WHERE category = ? ORDER BY RAND() LIMIT 1";

    con.query(sql, [category], (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.send(result);
        }
    });
});


app.listen( 9000, () => {
    console.log("Server Ready @ 9000");
});
