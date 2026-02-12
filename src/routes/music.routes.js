const express = require("express");

const router = express.Router();

const multer = require("multer");
const upload = multer({
    storage: multer.memoryStorage()
})

// controller -> routes
const musicController = require("../controllers/music.controller");


/* api start */
router.post("/upload", upload.single("music"),  musicController.createMusic)
/* api end */




module.exports = router;