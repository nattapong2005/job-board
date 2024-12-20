const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/users.route');
const usertypeRoute = require('./routes/usertype.route');
const jobtypeRoute = require('./routes/jobtype.route');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//  หน้าแรก
app.get("/", (req, res) => {
    res.send("<b>Job board API is online</b>");
});

// เพิ่มเส้นทาง route ตรงนี้
app.use("/users", userRoute);
app.use("/usertype", usertypeRoute);
app.use("/jobtype", jobtypeRoute);




// เมือไม่พบ Route
app.use((req, res, next) => {
    res.status(404).json({error: "ไม่พบเส้นทางที่เรียกใช้"});
  });






app.listen(port, () => {
    console.log("Server is running on port " + port);
});