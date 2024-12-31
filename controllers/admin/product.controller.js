//import model 
const Product = require("../../models/product.model")

const filterStatusHelper = require("../../helpers/filterStatus");

const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
// [GET] /admin/product

module.exports.index = async (req,res)=>{

    //Đoạn này là dùng cho bộ lọc 
    const filterStatus = filterStatusHelper(req.query);

    

    let find = {
        deleted : false 
    }

    
    // console.log(req.query.status);
    if(req.query.status){
        find.status=req.query.status;
    }
    const objectSearch = searchHelper(req.query);
    
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    //Pagination
    const countProducts = await Product.countDocuments(find);

    let objectPagination = paginationHelper({
        currentPage : 1,
        limitItem : 4
        },
        req.query,
        countProducts
    )

    // if(req.query.page){
    //     objectPagination.currentPage = parseInt(req.query.page) ;
    // }
    // objectPagination.skip = (objectPagination.currentPage - 1)*objectPagination.limitItem;
    
    // const countProducts = await Product.countDocuments(find);
    // const totalPage = Math.ceil(countProducts/objectPagination.limitItem);
    // objectPagination.totalPage = totalPage;
    // console.log(totalPage);
    // console.log(countProducts);


    //End Pagination 

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);
    // console.log(products);
    res.render("admin/pages/products/index",{
        title : "Trang Sản Phẩm",
        products: products,
        filterStatus:filterStatus,
        keyword : objectSearch.keyword,
        pagination : objectPagination
    })    
};

// [GET] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req,res) =>{
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({ _id:id},{ status: status})

    res.redirect("back"); 

}