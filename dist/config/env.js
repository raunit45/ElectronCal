"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ENV = {
    PORT: process.env.PORT || 3000,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || "",
    API_URL: process.env.API_URL || "https://releases.electronjs.org/releases.json",
};
exports.default = ENV;
