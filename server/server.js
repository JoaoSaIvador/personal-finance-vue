const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Import Routes
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');

// Middleware
app.use('/api/transactions', transactionRoutes);
app.use('/api/user', authRoutes);

// Routes
app.get('/', (req, res) => {
	res.send('We are on home');
})

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
	.then((res) => {
		console.log("Mongo DB Connection successful!");
	})

// Start listening to the server
app.listen(process.env.PORT || 4000);
