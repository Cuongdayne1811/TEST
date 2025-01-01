const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price:Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    slug:{
        type: String,
        slug:"title",
        unique: true
    },
    deleted: {
        type:Boolean,
        default: false
    },
    deleteAt:Date,
},{
    timestamps:true,
});

const Product = mongoose.model("Product",productSchema,"products")
//Product là tên của model chuẩn bị tạo còn products là collection trong compass
module.exports = Product;