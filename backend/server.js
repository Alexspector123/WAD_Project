import express from 'express';

import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';

import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); //allow to parse req body
app.use("/api/version1/auth", authRoutes);
app.use("/api/version1/movie", movieRoutes);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
    connectDB();
});

