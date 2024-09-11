const express = require("express");
const { test, signIn, signOut } = require("../controllers/auth.controller.js");

const router = express.Router();
router.get("/test", test);
router.post("/signin", signIn);
router.get("/signout", signOut);

module.exports = router;
