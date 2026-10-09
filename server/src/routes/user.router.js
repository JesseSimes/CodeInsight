const express = require('express')
const router = express.Router();
const {
    createUserController,
    loginUserController
} = require ('../controller/user.contoller')

const authMiddleware = require("../middleware/user.middleware")

//create user
router.post("/auth/register", createUserController);

//read user
router.get("/auth/login", loginUserController)

//authentication
router.get("/auth/me", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Authenticated user",
        user: req.user
    });
});

module.exports = router