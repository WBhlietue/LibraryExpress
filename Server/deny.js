const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema(
    {
        _id: { required: true, type: Number },
    }
);
module.exports = mongoose.model("deny", dataSchema);
