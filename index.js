const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const { loginController, registerController } = require("./Controllers");

const app = express();

app.use(bodyParser.json());
app.use(router.post("/login", loginController));
app.use(router.post("/register", registerController));

app.get("/", (req, res) => {
  res.send(
    "Requested Home page call api on post man <br> /login with email password <br>/register name,email,phone,password"
  );
});

app.listen(3001, () => {
  console.log(`Server is start at http://localhost:3001`);
});
