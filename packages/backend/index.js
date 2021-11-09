require('dotenv').config();
require('./configs/database').connect();

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user');
const manageRoutes = require('./routes/manage');
const orderRoutes = require('./routes/order');

const tokenMiddle = require('./middleWares/token.middleWare');

var cors = require('cors');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser('secret'));

app.use(function (req, res, next) {
  res.header('application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/manage', tokenMiddle.verifyToken, manageRoutes);

app.use(cors());
app.options('*', cors());

server.listen(4000, () => console.log(`Listening on port ${4000}`));
