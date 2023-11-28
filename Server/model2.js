const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema(
    {
        _id: { required: true, type: Number },
        pdf: { required: true, type: String },
    }
);
module.exports = mongoose.model("DataBack1", dataSchema);
