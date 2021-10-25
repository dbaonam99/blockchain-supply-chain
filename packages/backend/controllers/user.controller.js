const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyJwtToken } = require('../utils/verifyJwtToken');

const tokenLife = 60;
const refreshTokenLife = 120;

module.exports.index = async function (req, res) {
	return res.json('zxc')
}

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
	
	await User.findByIdAndUpdate({ _id: userEntity._id }, { refreshToken })

	res.status(200).json({ token, refreshToken });
}

module.exports.register = async function (req, res) {
  const { user, password } = req.body;
  const oldUser = await User.findOne({ user });

	if (oldUser) {
		return res.status(201).send('Email already exists!');
	}
	
	const salt = await bcrypt.genSalt();
	password = await bcrypt.hash(password, salt);

	const data = {
		user,
    password,
    create_at: new Date(),
	}

  await User.create(data);
  
	res.status(200).json(data);
}

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
			}
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
}