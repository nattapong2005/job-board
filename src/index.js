const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/users.route');
const usertypeRoute = require('./routes/usertype.route');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//  หน้าแรก
app.get("/", (req,res) => {
    res.send("API is online");
});

// เพิ่มเส้นทาง route ตรงนี้
app.use("/users", userRoute);
app.use("/usertype", usertypeRoute);












app.listen(port, () => {
    console.log("Server start at port " + port);
});