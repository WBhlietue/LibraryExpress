const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema(
    {
        _id: { required: true, type: String },
    }
);
module.exports = mongoose.model("categroy", dataSchema);
