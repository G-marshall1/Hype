const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { sequelize } = require('./models');

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
app.engine('hbs', handlebars({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

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
