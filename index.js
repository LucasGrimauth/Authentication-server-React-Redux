// Main starting point
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup

// Register Middlewares
app.use(morgan('combine')); //debugging
// CORS protects users from connecting to other domains, subdomains or ports
// so the server needs a way to the client when using another domain/subdomain/port
app.use(cors()); // Handle 	CORS
app.use(bodyParser.json({ type: '*/*'}));
router(app);

// Server Setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log('Server  listening on: ', port);