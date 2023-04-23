const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All Field Required!!");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Faild to create new user!!!");
  }
});

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // console.log(user, "user fetch data UserBox");

  const isPasswordMetch = user.password === password;

  if (user && isPasswordMetch) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
};

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query;
  const user = await User.find();
  res.json(user);
});

module.exports = { registerUser, authUser, allUsers };
