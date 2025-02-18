import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from './routes/tv.route.js';
import searchRoutes from './routes/search.route.js';


import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectedRoute } from './middleware/protectRoute.js';

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); //allow to parse req body
app.use(cookieParser());

app.use("/api/version1/auth", authRoutes);
app.use("/api/version1/movie", protectedRoute, movieRoutes);
app.use("/api/version1/tv", protectedRoute, tvRoutes);
app.use("/api/version1/search", protectedRoute, searchRoutes);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
    connectDB();
});

