const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "Nikita@123";
const loginController = function (req, res) {
  console.log("User logging in --- call");
  const loginData = req.body;
  console.log("Recieved login details =>", loginData);
  if (loginData.email && loginData.password) {
    const jwtToken = jwt.sign(loginData, SECRET_KEY);
    return res.status(200).send({ token: jwtToken });
  } else {
    return res.status(400).send({ message: "Invalid credentials" });
  }
};

const registerController = function (req, res) {
  console.log("User Registering api --- call");
  const userDetails = req.body;
  console.log("Recieved user details =>", userDetails);

  const password = userDetails?.password;
  const email = userDetails?.email;
  const name = userDetails?.name;
  const phone = userDetails?.phone;
  if (password != "" && email != "" && name != "" && phone != "") {
    bcrypt.genSalt(function (err, salt) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        bcrypt.hash(password, salt, function (err, hashedPassword) {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            console.log("User has registered successfully ");
            res.status(200).send({
              hash: hashedPassword,
              msg: " User has registered successfully.",
            });
          }
        });
      }
    });
  } else {
    res.status(200).send({
      msg: "Please enter user details name, email, phone, password",
    });
  }
};

module.exports = { loginController, registerController };
