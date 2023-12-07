const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { sequelize, Challenge, User, Video, Vote } = require('./models/index');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars Setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
const sess = {
  secret: process.env.SESSION_SECRET || 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
};

// Database Connection
sequelize.sync().then(() => {
  console.log('Database connected');

  // Setup SequelizeStore after the database is connected
  const sessionStore = new SequelizeStore({
    db: sequelize,
  });

  sess.store = sessionStore;

  app.use(session(sess));

  // Socket.io Connection
  io.on('connection', (socket) => {
    console.log('Socket connected');
    // Add real-time event handling here
  });

  // Routes
  const indexRoutes = require('./controllers/api/index');
  const userRoutes = require('./controllers/api/userRoutes');
  const videoRoutes = require('./controllers/api/videoRoutes');
  const challengeRoutes = require('./controllers/api/challengeRoutes');

  app.use('/', indexRoutes);
  app.use('/user', userRoutes);
  app.use('/video', videoRoutes);
  app.use('/challenge', challengeRoutes);

  // Error Handling Middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });

  // Server Start
  const PORT = process.env.PORT || 3000 ;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Hashing Example (for user passwords)
const password = 'userPassword';
const hashedPassword = bcrypt.hashSync(password, 10);
console.log('Hashed Password:', hashedPassword);
