const express = require("express")
const methodOverride = require('method-override')
const flash = require("express-flash")
const cookieParser = require("cookie-parser")
const session = require("express-session")
require("dotenv").config();

const database = require("./configs/database.js")
const route = require("./routes/clients/index.route")
const routeAdmin = require("./routes/admin/index.route.js")


const systemConfig = require("./configs/system.js")
const app = express();
const port = process.env.PORT ;

app.use(methodOverride('_method'))
app.set("views","./views")
app.set("view engine","pug")

// FLASH 
app.use(cookieParser('keylinhtinh'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// END FLASH

app.locals.prefixAdmin = systemConfig.prefixAdmin;
database.connect();
app.use(express.static("public"));           
//Routes
route(app);
routeAdmin(app);

app.listen(port,()=>{
    console.log(`Dang lang nghe o cong ${port}`)
})