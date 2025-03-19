import cron from 'node-cron';
import { fetchReleases } from '../scripts/fetchReleases';

export const scheduleReleases = () => {
    cron.schedule('0 0 * * *', () => {
        console.log('Fetching releases...');
        fetchReleases();
    });
};
