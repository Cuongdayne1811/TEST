const express = require("express")
const router = express.Router();   


const controllerProduct = require("../../controllers/client/home-products.controller.js")


router.get('/',controllerProduct.productsIndex)


module.exports = router ;