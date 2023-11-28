const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema(
    {
        _id: { required: true, type: Number },
        pdf: { required: true, type: String },
        name: { required: true, type: String },
        image: { required: true, type: String },
        category: { required: true, type: String },
        language: { required: true, type: String },
        author: { required: true, type: String },
    }
);
module.exports = mongoose.model("Data", dataSchema);
