require("dotenv").config();
let express = require("express");
const app = express();
const sequelize = require("./db");

let build = require("./controllers/buildcontroller");
let user = require("./controllers/usercontroller");

sequelize.sync();

app.use(require("./middleware/headers"));

app.use(express.json());

app.use("/user", user);

app.use("/build", build);

app.listen(3000, function () {
    console.log("App is listening on port 3000.")
});