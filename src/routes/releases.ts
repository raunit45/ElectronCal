import express from 'express';
import { getChromiumReleases } from '../services/chromiumService';

const router = express.Router();

router.get('/releases', async (req, res) => {
    try {
        const releases = await getChromiumReleases();
        res.json(releases);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch releases' });
    }
});

export default router;
