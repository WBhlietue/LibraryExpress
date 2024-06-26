const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const Model = require("./model");
const Model2 = require("./model2");
const Model3 = require("./model3");
const Model4 = require("./model4");
const UserModel = require("./User");
const Category = require("./category");
const Accept = require("./accept");
const Deny = require("./deny");
const fs = require("fs");
const path = require("path");

const PORT = 8000;

require("dotenv").config();
const mongoString = "mongodb://127.0.0.1:27017";
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", async () => {
    console.log("Connect");
});

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(fileUpload());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.get("/api/book", async (req, res) => {
    const data = await Model.find();
    const result = [];
    for (let i = 0; i < data.length; i++) {
        const d = await Accept.findById(data[i]._id);
        if (d) {
            result.push(await ConvertData(data[i]));
        }
    }
    res.json(result);
});
app.get("/api/book/:id", async (req, res) => {
    const id = req.params.id;
    const data = await Model.findById(req.params.id);
    if (!data) {
        res.json({ status: 404, message: "Not found" });
        return;
    }
    const cD = await ConvertData(data);
    res.json({ book: cD, status: "200" });
});
app.get("/api/deleteAllUser", async (req, res) => {
    const a = await UserModel.deleteMany();
    res.send(a);
});

app.post("/login", async (req, res) => {
    const data = req.body;
    if (data.email == "admin" && data.pass == "admin") {
        res.json({ status: 3, name: "admin", email: "admin" });
        return;
    }
    const usr = await UserModel.findById(data.email);
    if (!usr) {
        res.json({ status: 0 });
    } else {
        if (usr.pass === data.pass) {
            // login successful
            res.json({ status: 2, name: usr.name, email: data.email });
        } else {
            res.json({ status: 1, name: "none" });
        }
    }
});

app.post("/register", async (req, res) => {
    const data = req.body;
    const usr = await UserModel.findById(data.email);
    if (usr) {
        res.json({ status: 0 });
    } else {
        const d = new UserModel({
            _id: data.email,
            name: data.name,
            pass: data.pass,
            history: [],
        });
        await d.save();
        res.json({ status: 1, name: data.name, email: data.email });
    }
});

app.post("/uploadHistory", async (req, res) => {
    console.log(req.body);
    const history = (await UserModel.findById(req.body.email)).history;
    console.log(history);
    if (history.indexOf(req.body.id) != -1) {
        history.splice(history.indexOf(req.body.id), 1);
    }
    history.push(req.body.id);

    await UserModel.findByIdAndUpdate(req.body.email, { history: history });
    res.send("hi");
});
app.get("/getUserView", async (req, res) => {
    const user = await UserModel.find();
    const result = [];
    for (let i of user) {
        result.push([i._id, i.name, i.history.length]);
    }
    result.sort((a, b) => b[2] - a[2]);
    res.json(result);
});
app.get("/getBookView", async (req, res) => {
    const data = await Model.find();
    const result = [];
    for (let i of data) {
        result.push([i._id, i.name, 0]);
    }
    const user = await UserModel.find();
    for (let i of user) {
        for (let j of i.history) {
            result[j - 1][2]++;
        }
    }
    result.sort((a, b) => b[2] - a[2]);
    res.json(result);
});
app.get("/request", async (req, res) => {
    const data = await Model.find();
    const result = [];
    for (let i of data) {
        if (!(await Accept.findById(i._id)) && ! await Deny.findById(i._id)) {
            result.push([i._id, i.name]);
        }
    }
    return res.json(result);
});
app.get("/accept/:idd", async (req, res) => {
    console.log(req.params);
    const a = new Accept({_id: req.params.idd})
    await a.save()

    res.json({status: 1})
});
app.get("/deny/:id", async (req, res) => {
    const a = new Deny({_id: req.params.id})
    await a.save()

    res.json({status: 1})
});
app.get("/getHistory/:email", async (req, res) => {
    const history = (await UserModel.findById(req.params.email)).history;
    const data = [];
    for (let i of history) {
        data.push(await ConvertData(await Model.findById(i)));
    }
    res.json(data);
});
app.get("/category", async (req, res) => {
    res.json(await Category.find());
});
app.post("/category", async (req, res) => {
    const data = req.body;
    const c = new Category({
        _id: data.name,
    });
    await c.save();
    res.json({ status: 1 });
});
app.get("/category/:name", async (req, res) => {
    const d = await Category.findById(req.params.name);
    await Category.findByIdAndDelete(d);
    res.json({ status: 1 });
});
app.get("/users", async (req, res) => {
    res.json(await UserModel.find());
});

app.post("/upload", async (req, res) => {
    const num = await Model.find();
    const id = num.length + 1;
    const pdfS = Slice2String(req.body.pdf);

    const data = new Model({
        _id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        language: req.body.language,
        author: req.body.author,
        pdf: pdfS[0],
    });
    const data2 = new Model2({
        _id: id,
        pdf: pdfS[1],
    });
    const data3 = new Model3({
        _id: id,
        pdf: pdfS[2],
    });
    const data4 = new Model4({
        _id: id,
        pdf: pdfS[3],
    });
    await data.save();
    await data2.save();
    await data3.save();
    await data4.save();
    res.json({ status: 1 });
});

app.listen(PORT, () => {
    UserModel.findById("admin").then((data) => {
        if (!data) {
            const user = new UserModel({
                _id: "admin",
                name: "admin",
                pass: "admin",
                history: [],
            });
            user.save();
        }
    });
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
    const aa = await writeFilePromise(__dirname + "/public/test.pdf", a, {
        encoding: "base64",
    });
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

function Slice2String(strArr) {
    let str = "";
    let str2 = "";
    let str3 = "";
    let str4 = "";
    for (let i = 0; i < strArr.length; i++) {
        if (i < strArr.length / 4) {
            str += strArr[i];
        } else if (i < strArr.length / 2) {
            str2 += strArr[i];
        } else if (i < (strArr.length / 4) * 3) {
            str3 += strArr[i];
        } else {
            str4 += strArr[i];
        }
    }
    return [str, str2, str3, str4];
}

function splitString(str, chunkLength) {
    const regex = new RegExp(`.{1,${chunkLength}}`, "g");
    return str.match(regex);
}
