const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.postSignUp = [
  check("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First Name should be atleast 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name should contain only alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain atleast one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain atleast one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain atleast one number")
    .matches(/[!@&]/)
    .withMessage("Password should contain atleast one special character")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords doesn't match");
      }
      return true;
    }),

  async (req, res, next) => {
    const { name, email, password } = req.body;

    const errors = validationResult(req);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }

    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: errors.array().map((err) => err.msg), // The validation errors array
        enteredValues: { name, email }, // Sending back entered values (excluding password for security)
      });
    }

    bcrypt
      .hash(password, 12)
      .then(async (hashedPassword) => {
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });
        await user.save();

        // 201 = Created new resource "new user"..
        res.status(201).json({
          success: true,
          message: "Account created successfully.",
        });
      })
      .catch((err) => {
        return res.status(422).json({
          success: false,
          message: err.message,
          enteredValues: { name, email },
        });
      });
  },
];

exports.postSignin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).json({
      success: false,
      message: "User does not exist",
      enteredValues: { email },
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).json({
      success: false,
      message: "Invalid Password",
      enteredValues: { email },
    });
  }

  req.session.isLoggedIn = true;
  req.session.userID = user._id;
  await req.session.save();

  res.status(200).json({
    success: true,
    message: "Signed In Successfully!",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

exports.postSignOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message || "Logout failed",
      });
    }

    res.clearCookie("connect.sid");
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  });
};

exports.getAuthStatus = async (req, res, next) => {
  try {
    // User is not logged in
    if (!req.session.isLoggedIn) {
      return res.status(200).json({
        success: false,
        message: "Session expired or doesn't exist.",
        user: null,
      });
    }

    // Get latest user data from DB
    const user = await User.findById(req.session.userID);

    // Session exists but user deleted
    if (!user) {
      req.session.destroy(() => {});
      return res.status(200).json({
        success: false,
        message: "User not found.",
        user: null,
      });
    }

    // User is logged in
    if (req.session.isLoggedIn) {
      res.status(200).json({
        success: true,
        isLoggedIn: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};
