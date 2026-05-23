const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const universityRoutes = require('./routes/universities');
const emailRoutes = require('./routes/emails');
const waitlistRoutes = require('./routes/waitlist');
const trackerRoutes = require('./routes/tracker');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/tracker', trackerRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Univestree backend is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
