const mongoose = require("mongoose");

const postSchema = {
    title: String,
    description: String
}
module.exports = mongoose.model("Post", postSchema);

