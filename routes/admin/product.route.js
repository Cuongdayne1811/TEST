const express = require("express")
const router = express.Router();    
const controller = require("../../controllers/admin/product.controller")
const multer  = require('multer')
const storageMulter = require("../../helpers/storageMulter")
const upload = multer({ storage: storageMulter()})


router.get('/',controller.index);
// Dấu 2 chám dùng để nhận data động của 2 giá trị status và id 
router.patch('/change-status/:status/:id',controller.changeStatus);

router.delete('/delete/:id',controller.deleteItem);

router.get("/create",controller.create);

router.post("/create",upload.single('thumbnail'),controller.createPost);
module.exports = router ;