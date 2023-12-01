const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { sequelize, Challenge, User, Video, Vote } = require('./models/index');
const exphbs = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Handlebars Setup
const hbs = exphbs.create();
const sess = {
  secret: 'Super secret secret',
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
  const indexRoutes = require('./routes/index');
  const userRoutes = require('./routes/userRoutes');
  const videoRoutes = require('./routes/videoRoutes');

  app.use('/', indexRoutes);
  app.use('/user', userRoutes);
  app.use('/video', videoRoutes);

  // Server Start
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
