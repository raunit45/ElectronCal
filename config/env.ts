import dotenv from 'dotenv';

dotenv.config();

const ENV = {
    PORT: process.env.PORT || 3000,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || "",
    API_URL: process.env.API_URL || "https://releases.electronjs.org/releases.json",
};

export default ENV;