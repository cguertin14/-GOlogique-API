import './config/config.js';
import './config/passport.js';
import './db/mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import rateLimiter from './config/rateLimiter';
import userRoutes from './api/routes/users';
import mapRoutes from './api/routes/map';

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(rateLimiter);

// Routes.
app.use('/users', userRoutes);
app.use('/map', mapRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export { app };