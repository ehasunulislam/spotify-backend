const express = require('express');

const router = express.Router();

// controller -> to route
const authController = require("../controllers/auth.controller");


/* register api start */
router.post("/register", authController.registerUser);
/* register api end */


/* login api start */
router.post("/login", authController.loginUser)
/* login api end */


// arekta korte hobe 



module.exports = router;