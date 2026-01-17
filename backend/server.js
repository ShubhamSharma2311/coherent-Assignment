require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const vaccineRoutes = require('./routes/vaccineRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', vaccineRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Health Insight Dashboard API', version: '1.0.0' });
});

// Start server only after MongoDB connection is established
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
