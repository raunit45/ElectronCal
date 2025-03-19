"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("./config/env"));
const releases_1 = __importDefault(require("./routes/releases"));
const app = (0, express_1.default)();
// Serve static files from the public directory
app.use(express_1.default.static('public'));
// Use the releases router
app.use('/api', releases_1.default);
// Basic route for the home page
app.get('/', (req, res) => {
    res.send('Electron Releases Calendar API');
});
app.listen(env_1.default.PORT, () => {
    console.log(`Server is running on port ${env_1.default.PORT}`);
});
exports.default = app;
