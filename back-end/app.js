const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const createError = require('http-errors');
const cors = require('cors');
const mongoose = require('mongoose')

app.use(cors());

const userRoutes = require('./routes/userRoutes');


app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

// Middleware configuration to add a 'data' property




// Use the routes
app.use('/api',userRoutes);
// app.use('/admin', adminRoutes);



// Handle 404 errors
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
mongoose.connect('mongodb://127.0.0.1:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error.message);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
// Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
