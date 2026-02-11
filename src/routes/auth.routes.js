const express = require('express');

const router = express.Router();

// controller -> to route
const authController = require("../controllers/auth.controller");


/* api start */
router.post("/register", authController.registerUser);
/* api end */



module.exports = router;