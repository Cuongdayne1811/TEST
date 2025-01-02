const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    title: String,
    description: String,
    nhomQuyen:{
        type: Array,
        default:[]
    },
    deleted: {
        type:Boolean,
        default: false
    },
    deleteAt:Date,
},
{
    timestamps:true,
});

const Role = mongoose.model("Role",roleSchema,"roles")
//Product là tên của model chuẩn bị tạo còn products là collection trong compass
module.exports = Role;