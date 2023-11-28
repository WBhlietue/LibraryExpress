const fs = require("fs")
fs.readFile(__dirname+"/test.txt", {encoding:"UTF-8"}, (e, r)=>{
    fs.writeFile(__dirname+"/test.pdf", r, {encoding:"base64"}, (a)=>{})
})