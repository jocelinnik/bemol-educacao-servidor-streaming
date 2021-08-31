const express = require("express");
const fs = require("fs");
const path = require("path");

const streamingController = require("../controllers/StreamingController");
const postavideoController = require("../controllers/PostaVideoController");

const router = express.Router();

router.post("/video", streamingController.getVideo);

router.post("/posta-video", postavideoController.armazenarVideo);

module.exports = router;
