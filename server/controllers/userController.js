const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
  let { name, email, password } = req.body;

  const userExists = await User.findOne({
    email,
  });

  if (userExists) {
    return res.status(201).send({
      message: "User already exists",
    });
  }
  let hashpassword;
  try {
    hashpassword = await bcrypt.hash(password, 10);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in hashing",
    });
  }

  let user = await User.create({
    name,
    email,
    password: hashpassword,
    image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
  });

  const paylod = {
    email: user.email,
    id: user._id,
  };

  let token = jwt.sign(paylod, process.env.JWT_SCERET, { expiresIn: "24h" });

  const options = {
    expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    httpOnly: true,
  };

  user.token = token;
  user.password = undefined;

  return res.cookie("token", token, options).status(200).json({
    success: true,
    token,
    user,
    message: "user created successfully",
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "fill entry correctully",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not registered",
      });
    }

    const paylod = {
      email: user.email,
      id: user._id,
    };

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(paylod, process.env.JWT_SCERET, {
        expiresIn: "24h",
      });

      //    user=user.toObject();

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        options,
        message: "user logged successfuly",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorect password",
      });
    }
  } catch (err) {
    console.error(err);
    console.log(err.message);

    return res.status(500).json({
      success: false,
      message: "login failed",
    });
  }
};


exports.toFav = async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.favCarsID.indexOf(rid);

    if (index > -1) {
      user.favCarsID.splice(index, 1);
      await user.save();
      res.status(200).send({ message: "Removed from favorites", user });
    } else {
      user.favCarsID.push(rid);
      await user.save();
      res.status(200).send({ message: "Added to favorites", user });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllFav = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }, "favCarsID");
    res.status(200).send(user.favCarsID);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
