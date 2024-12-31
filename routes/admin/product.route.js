const express = require("express")
const router = express.Router();    
const controller = require("../../controllers/admin/product.controller")

router.get('/',controller.index);
// Dấu 2 chám dùng để nhận data động của 2 giá trị status và id 
router.patch('/change-status/:status/:id',controller.changeStatus);

module.exports = router ;