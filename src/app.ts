import express from 'express';
import ENV from './config/env';
import releasesRouter from './routes/releases';

const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

// Use the releases router
app.use('/api', releasesRouter);

// Basic route for the home page
app.get('/', (req, res) => {
    res.send('Electron Releases Calendar API');
});

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});

export default app;
