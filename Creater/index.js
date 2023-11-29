const MAX = 8192;
const fs = require("fs");
const Model = require("./model");
const Model2 = require("./model2");
const Model3 = require("./model3");
const Model4 = require("./model4");
const mongoose = require("mongoose");
let num = 0;
require("dotenv").config();
const mongoString = "mongodb://localhost";
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", async () => {
    console.log("Database Connected");
    const data = await Model.find();
    const a = await Model.deleteMany({});
    const a2 = await Model2.deleteMany({});
    const a22 = await Model3.deleteMany({});
    const a233 = await Model4.deleteMany({});
    // console.log(data);
    fs.readdir(__dirname + "/book", async (err, res) => {
        res.forEach(async (i, o) => {
            let name = i.substring(0, i.length - 4);
            console.log(o + 1 + "/" + res.length);
            const image = fs.readFileSync(
                __dirname + "/book/" + name + ".png",
                {
                    encoding: "base64",
                }
            );
            const pdf = fs
                .readFileSync(__dirname + "/pdf/" + name + ".pdf")
                .toString("base64");
            const pdfS = Slice2String(
                splitString(pdf, Math.floor(pdf.length / 40))
            );
            if (o == 8) {
                fs.writeFile(
                    __dirname + "/test.txt",
                     pdf,
                    (a) => {}
                );
            }
            const data = new Model({
                _id: o + 1,
                name: name,
                image: image,
                category: "none",
                language: "English",
                author: "Not me",
                pdf: pdfS[0],
            });
            

            const data2 = new Model2({
                _id: o + 1,
                pdf: pdfS[1],
            });
            const data3 = new Model3({
                _id: o + 1,
                pdf: pdfS[2],
            });
            const data4 = new Model4({
                _id: o + 1,
                pdf: pdfS[3],
            });
            const dataSave = await data.save();
            const dataSave2 = await data2.save();
            const dataSave3 = await data3.save();
            const dataSave4 = await data4.save();
            num++;
            console.log(num + ":" + res.length);
        });
    });
});

function Slice2String(strArr) {
    let str = "";
    let str2 = "";
    let str3 = "";
    let str4 = "";
    for (let i = 0; i < strArr.length; i++) {
        if (i < 10) {
            str += strArr[i];
        } else if (i < 20) {
            str2 += strArr[i];
        } else if (i < 30) {
            str3 += strArr[i];
        } else {
            str4 += strArr[i];
        }
    }
    return [str, str2, str3, str4];
}

function calculateSizeInMB(str) {
    const byteSize = Buffer.from(str, "utf-8").length;

    const sizeInMB = byteSize / (1024 * 1024);

    return sizeInMB;
}

function splitString(str, chunkLength) {
    const regex = new RegExp(`.{1,${chunkLength}}`, "g");
    return str.match(regex);
}
