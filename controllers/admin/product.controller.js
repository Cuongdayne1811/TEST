//import model 
const Product = require("../../models/product.model")

const systemConfig = require("../../configs/system");
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

    const products = await Product.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);
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

    // FLASH thông báo ra màn hình thay đổi trạng thái thành công
    req.flash("success","Cập nhật trạng thái của sản phẩm thành công !");

    res.redirect("back"); 

};

//[DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req,res) =>{
    const id = req.params.id;
    // ĐÂY LÀ XÓA CỨNG 
    await Product.deleteOne({ _id:id})
    // ĐÂY LÀ XÓA MỀM
    await Product.updateOne({ _id:id},{deleted : true});
    res.redirect("back"); 

};
//[GET] /admin/product/create
module.exports.create = async (req,res) =>{
  res.render("admin/pages/products/create",{
    pageTitle : " Thêm mới sản phẩm",
  });
};

//[GET] /admin/product/edit/:id
module.exports.edit = async (req,res) =>{
    try {
        const find ={
            deleted : false,
            _id : req.params.id
        };
        const product = await Product.findOne(find);
        
        
        res.render("admin/pages/products/edit",{
          pageTitle : " Chỉnh sửa sản phẩm",
          product : product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
  };

  //[PATCH] /admin/product/edit/:id
  module.exports.editPatch = async (req,res) =>{
    const id = req.params.id;
    req.body.price=parseInt(req.body.price);
    req.body.discountPercentage=parseInt(req.body.discountPercentage);
    req.body.stock=parseInt(req.body.stock);
    req.body.position= parseInt(req.body.position);

    if(req.file){
        req.body.thumbnail=`/uploads/${req.file.filename}`;
    }
    
    try {
        await Product.updateOne({id : id},req.body);
        req.flash("success","Cập nhật thành công")
    } catch (error) {
        req.flash("error","Cập nhật thất bại")
    }
    res.redirect("back");
  };

//[POST] /admin/product/create
module.exports.createPost = async (req,res)=>{

    req.body.price=parseInt(req.body.price);
    req.body.discountPercentage=parseInt(req.body.discountPercentage);
    req.body.stock=parseInt(req.body.stock);

    if(req.body.position==""){
        const countProducts=await Product.count();
        req.body.position= countProducts + 1;
    } else{
        req.body.position= parseInt(req.body.position);
    }

    if(req.file){
        req.body.thumbnail=`/uploads/${req.file.filename}`;
    }
    
    const product= new Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
    
};