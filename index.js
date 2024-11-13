// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors()); // Allow all origins (or specify allowed origins)

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});