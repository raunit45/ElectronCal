"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ENV = {
    PORT: process.env.PORT || 3000,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || "",
    API_URL: process.env.API_URL || "https://api.electronjs.org/releases",
};
exports.default = ENV;
