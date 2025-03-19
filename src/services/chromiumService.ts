import axios from 'axios';

interface ChromiumRelease {
    version: string;
    channel: string;
    date: string;
}

export async function getChromiumReleases(): Promise<ChromiumRelease[]> {
    try {
        const response = await axios.get('https://chromiumdash.appspot.com/schedule');
        return response.data.map((release: any) => ({
            version: release.version,
            channel: release.channel,
            date: release.stable_date
        }));
    } catch (error) {
        console.error('Error fetching Chromium releases:', error);
        return [];
    }
}