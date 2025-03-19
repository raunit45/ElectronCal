"use strict";
exports.__esModule = true;
exports.scheduleReleases = void 0;
var node_cron_1 = require("node-cron");
var fetchReleases_1 = require("../../scripts/fetchReleases");
var scheduleReleases = function () {
    node_cron_1["default"].schedule('0 0 * * *', function () {
        console.log('Fetching releases...');
        (0, fetchReleases_1.fetchReleases)();
    });
};
exports.scheduleReleases = scheduleReleases;
