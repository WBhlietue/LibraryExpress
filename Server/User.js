const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema(
    {
        _id: { required: true, type: String },
        name: { required: true, type: String },
        pass: { required: true, type: String },
        history:{required:true, type:[Number]}
    }
);
module.exports = mongoose.model("sanUser", dataSchema);
