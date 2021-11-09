const { verifyJwtToken } = require('../utils/verifyJwtToken');

module.exports.verifyToken = async function (req, res, next) {
  const token = req.headers?.authorization?.split(' ')[1];

  if (token) {
    try {
      const decoded = await verifyJwtToken(token, process.env.SECRET);
      req.decoded = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        message: 'Unauthorized access.',
      });
    }
  } else {
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
};
