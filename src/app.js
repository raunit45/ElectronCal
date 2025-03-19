"use strict";
exports.__esModule = true;
var express_1 = require("express");
var releases_1 = require("./routes/releases");
var scheduler_1 = require("./utils/scheduler");
var app = (0, express_1["default"])();
var PORT = process.env.PORT || 3000;
app.use(express_1["default"].static('public'));
app.use('/', releases_1["default"]);
(0, scheduler_1.scheduleReleases)();
app.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});
