const express = require("express")
require("dotenv").config();

const database = require("./configs/database.js")
const route = require("./routes/clients/index.route")
const routeAdmin = require("./routes/admin/index.route.js")

const systemConfig = require("./configs/system.js")
const app = express();
const port = process.env.PORT ;

app.set("views","./views")
app.set("view engine","pug")

app.locals.prefixAdmin = systemConfig.prefixAdmin;
database.connect();
app.use(express.static("public"));           
//Routes
route(app);
routeAdmin(app);

app.listen(port,()=>{
    console.log(`Dang lang nghe o cong ${port}`)
})