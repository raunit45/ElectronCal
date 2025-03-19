"use strict";
exports.__esModule = true;
var express_1 = require("express");
var electronService_1 = require("../api/electronService");
var chromiumService_1 = require("../api/chromiumService");
var router = express_1["default"].Router();
router.get('/releases', function (req, res) {
    res.json({
        electron: (0, electronService_1.getElectronVersion)(),
        chromium: (0, chromiumService_1.getChromiumVersion)()
    });
});
exports["default"] = router;
