const express = require('express');
const bodyParser = require("body-parser");
const viewEngine = require("./configs/viewEngine");
const webRoutes = require("./routes/web");

const path = require('path');
// Phục vụ các tệp tĩnh từ thư mục 'public'


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'src/images')));
//config viewEngine
viewEngine(app);
webRoutes(app);



let port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log("app is running at the port:", port);
});