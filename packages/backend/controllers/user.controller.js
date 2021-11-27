const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyJwtToken } = require('../utils/verifyJwtToken');

const tokenLife = 6000;
const refreshTokenLife = 12000;

module.exports.index = async function (req, res) {
  const userEntity = await User.findOne({ user: req.decoded.user });
  return res.json({
    _id: userEntity._id,
    user: userEntity.user,
    role: userEntity.role,
    privateKey: userEntity.privateKey,
    create_at: userEntity.create_at,
  });
};

module.exports.getAll = async function (req, res) {
  const users = await User.find();
  return res.json(users);
};

module.exports.login = async function (req, res) {
  const { user, password } = req.body;

  const userEntity = await User.findOne({ user });

  if (!userEntity) {
    return res.status(201).send('User not found!');
  }

  const validPassword = await bcrypt.compare(password, userEntity.password);
  if (!validPassword) {
    return res.status(201).send('Wrong password!');
  }

  const token = jwt.sign({ user }, process.env.SECRET, {
    expiresIn: tokenLife,
  });

  const refreshToken = jwt.sign({ user }, process.env.SECRET, {
    expiresIn: refreshTokenLife,
  });

  await User.findByIdAndUpdate({ _id: userEntity._id }, { refreshToken });

  res
    .status(200)
    .json({ token, refreshToken, privateKey: userEntity.privateKey });
};

module.exports.register = async function (req, res) {
  const { user, password, role, privateKey } = req.body;
  const oldUser = await User.findOne({ user });

  if (oldUser) {
    return res.status(201).send('Email already exists!');
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const data = {
    user,
    password: hashedPassword,
    create_at: new Date(),
    role,
    privateKey,
  };

  await User.create(data);

  res.status(200).json('OK');
};

module.exports.refresh = async function (req, res) {
  const { refreshToken } = req.body;

  const userEntity = await User.findOne({ refreshToken });

  if (userEntity && refreshToken) {
    try {
      await verifyJwtToken(refreshToken, process.env.SECRET);
      const token = jwt.sign({ userEntity }, process.env.SECRET, {
        expiresIn: tokenLife,
      });
      const response = {
        token,
      };
      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(403).json({
        message: 'Invalid refresh token',
      });
    }
  } else {
    res.status(400).json({
      message: 'Invalid request',
    });
  }
};
