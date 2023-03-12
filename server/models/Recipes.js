const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let recipeSchema = new Schema ({
    name: String,
    instructions: [],
    ingredients: [],
    categories: [],
    images: [{id: { type: Schema.Types.ObjectId, ref: "image"}}]
});

module.exports = mongoose.model("Recipe", recipeSchema);