const Product = require("../../models/product.model.js")

// [GET] /products

module.exports.productsIndex = async (req,res)=>{
    const products = await Product.find({
        status : "active",
        deleted : false
    });

    // console.log(products);

    
    // Nên dùng hàm map để tạo ra 1 mảng mới để k đụng vào data cũ

    const newProducts = products.map(item => {
        item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    });
        console.log(newProducts)
    res.render("client/pages/products/index.pug",{
        title : "Trang san pham",
        products : newProducts
    });
}