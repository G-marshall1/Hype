const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { sequelize } = require('./models/index');
const exphbs = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));

// Handlebars Setup
// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });
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
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Database Connection
sequelize.sync().then(() => {
  console.log('Database connected');
});

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
