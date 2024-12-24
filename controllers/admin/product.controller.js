//import model 
const Product = require("../../models/product.model")



// [GET] /admin/product

module.exports.index = async (req,res)=>{

    const filterStatus = [
        {
            name:"Tất cả",
            status:"",
            class:""
        },
        {
            name:"Hoạt động",
            status:"active",
            class:""
        },
        {
            name:"Dừng hoạt động",
            status:"inactive",
            class:""
        }
    ]
    //Dựa vào cái status của req mà thay đổi class của button đó thành active
    if(req.query.status){
        const index = filterStatus.findIndex(item=>item.status == req.query.status);
        filterStatus[index].class = "active";
    }else{
        const index = filterStatus.findIndex(item=>item.status == "");
        filterStatus[index].class = "active";
    }

    let find = {deleted : false }
    // console.log(req.query.status);
    if(req.query.status){
        find.status=req.query.status;
    }

    const products = await Product.find(find);
    // console.log(products);
    res.render("admin/pages/products/index",{
        title : "Trang Sản Phẩm",
        products: products,
        filterStatus:filterStatus
    })    
};