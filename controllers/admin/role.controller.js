const Role= require("../../models/role.model")

const systemConfig = require("../../configs/system");
// [GET] /admin/roles


module.exports.index = async (req,res)=>{
    let find = {
        deleted:false
    };
    const records=  await Role.find(find);

    res.render("admin/pages/roles/index", {
        title : "Trang Nhóm Quyền ",
        records: records
    });
}

//[GET] /admin/roles/create
module.exports.create = async (req,res)=>{
    
    res.render("admin/pages/roles/create", {
        title : "Tạo Nhóm Quyền "
    });
}

//[POST] /admin/roles/create
module.exports.createPost = async (req,res)=>{
    console.log(req.body);
    const record = new  Role(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
//[PATCH] /admin/roles/edit
module.exports.editPatch = async (req,res)=>{
    try {
        const id = req.params.id;

        await Role.updateOne({_id:id}, req.body);

        req.flash("success","cập nhật nhóm quyền thành công");
        
        
    } catch (error) {
        req.flash("success","cập nhật nhóm quyền lỗi");
    }
    res.redirect("back");
};

//[Get] /admin/roles/edit
module.exports.edit = async (req,res)=>{
    try {
        const id=req.params.id;

        let find={
            _id: id,
            deleted: false
        };

        const data = await Role.findOne(find);


        res.render("admin/pages/roles/edit", {
            title : "Sửa Nhóm Quyền ",
            data: data
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
    
};

//[Get] /admin/roles/permissions
module.exports.permissions = async (req,res)=>{
    let find ={
        deleted: false
    };

    const records= await Role.find(find);

    res.render("admin/pages/roles/permissions", {
        title : "Phân Quyền ",
        records: records
    });
};

//[Patch] /admin/roles/permissions
module.exports.permissionsPatch = async (req,res)=>{
    
    const permissions=JSON.parse(req.body.permissions);
    
    for(const item of permissions){
        
        await Role.updateOne({_id: item.id},{permissions: item.permissions});
    }
    req.flash("success","Cập nhật phân quyền thành công");
    res.redirect("back");
};

