const express = require("express");
const methodOverride = require('method-override');
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer  = require('multer')
require("dotenv").config();

const database = require("./configs/database.js");
const route = require("./routes/clients/index.route");
const routeAdmin = require("./routes/admin/index.route.js");

const systemConfig = require("./configs/system.js");

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set("views", "./views");
app.set("view engine", "pug");

// FLASH
app.use(cookieParser('keylinhtinh'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// END FLASH

// Biến toàn cục
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Kết nối cơ sở dữ liệu
database.connect();

// Phục vụ các tệp tĩnh
app.use(express.static("public"));           

// Định tuyến
route(app);
routeAdmin(app);

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang lắng nghe ở cổng ${port}`);
});
