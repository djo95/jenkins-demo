const User = require("../Models/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.testApi = function testApi(req, res) {
  res.send("work!");
};

exports.SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const found = await User.findOne({ email });

    if (!found) {
      return res.status(400).send({ errors: [{ msg: "Email invalid" }] });
    }

    const matched = bcrypt.compareSync(password, found.password);

    if (!matched) {
      return res.status(400).send({ errors: [{ msg: "Wrong password" }] });
    }

    const payload = { id: found._id };
    var token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });

    res.status(200).send({ msg: "Sign IN", found, token });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "Could not signIn" }] });
  }
};
exports.SignUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const found = await User.findOne({ email });
    console.log(found);

    if (found) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Email already exists" }] });
    }

    const newUser = new User({ ...req.body, role: "client" });
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    newUser.password = hashedPassword;
    

    const payload = { id: newUser._id };
   
    var token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });
    console.log(token);
    await newUser.save();

    res.status(200).send({ msg: "User added", newUser, token });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "Could not SignUp" }] });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndUpdate(id, { $set: req.body });

    res.status(200).send({ Msg: "User updated" });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "Could not update user" }] });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id)
    res.status(200).send({msg: "User deleted"})
  } catch (error) {
    res.status(500).send({msg:"Could not delete contact",error:error.toString()})
  }
};
