const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");
const Model = require("./model");
const Model2 = require("./model2");
const Model3 = require("./model3");
const Model4 = require("./model4");
const fs = require("fs");
const path = require('path');

const PORT = 8000;

require("dotenv").config();
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", async () => {
    console.log("Connect");
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(fileUpload());

app.get("/api/book", async (req, res) => {
    const data = await Model.find();
    for (let i = 0; i < data.length; i++) {
        data[i] = await ConvertData(data[i]);
    }
    res.json(data);
});
app.get("/api/book/:id", async (req, res) => {
    const id = req.params.id;
    const data = await Model.findById(req.params.id);
    const cD = await ConvertData(data);
    res.json({ book: cD, status: "200" });
});

app.listen(PORT, () => {
    console.log("open");
});

async function ConvertData(data) {
    let a = "";

    a += data.pdf;
    const dta = await Model2.findById(data._id);
    a += dta.pdf;
    const dta1 = await Model3.findById(data._id);
    a += dta1.pdf;
    const dta2 = await Model4.findById(data._id);
    a += dta2.pdf;
    const aa = await writeFilePromise(__dirname+"/public/test.pdf", a, {encoding:"base64"})
    const d = {
        id: data._id,
        name: data.name,
        image: "data:image/png;base64," + data.image,
        pdf: "http://127.0.0.1:8000/test.pdf",
        category: data.category,
        language: data.language,
        author: data.author,
    };
    return d;
}

function writeFilePromise(filePath, data, options) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, options, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}