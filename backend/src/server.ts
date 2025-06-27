import express from 'express';
import cors from 'cors';
import dataRoutes from './routes/dataRoutes';

const app = express();
app.use(cors());

// Logger Middleware
app.use((req, _, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route handler
app.use('/api', dataRoutes);

// Start server
app.listen(3001, () => console.log('Server running on port 3001'));
