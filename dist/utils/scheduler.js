"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleReleases = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const fetchReleases_1 = require("../scripts/fetchReleases");
const scheduleReleases = () => {
    node_cron_1.default.schedule('0 0 * * *', () => {
        console.log('Fetching releases...');
        (0, fetchReleases_1.fetchReleases)();
    });
};
exports.scheduleReleases = scheduleReleases;
