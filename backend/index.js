const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const rateLimit = require('express-rate-limit');
const swaggerDocs = require('./config/swagger');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// API Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', limiter, userRoutes);


// Swagger Docs
swaggerDocs(app, limiter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
