const express = require('express');
const bodyParser = require("body-parser");
const viewEngine = require("./configs/viewEngine");
const webRoutes = require("./routes/web");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//config viewEngine
viewEngine(app);
webRoutes(app);



let port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log("app is running at the port:", port);
});