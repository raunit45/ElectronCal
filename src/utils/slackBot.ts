import axios from 'axios';
import ENV from '../config/env';

export const sendSlackNotification = async (message: string) => {
    try {
        await axios.post(ENV.SLACK_WEBHOOK_URL, {
            text: message,
        });
        console.log('Notification sent to Slack');
    } catch (error) {
        console.error('Error sending Slack notification:', error);
    }
};
