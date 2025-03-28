import axios from 'axios';
import ENV from '../config/env';

export const fetchReleases = async () => {
    try {
        const response = await axios.get(ENV.API_URL);
        console.log('Fetched releases:', response.data);
    } catch (error) {
        console.error('Error fetching releases:', error);
    }
};

fetchReleases();
