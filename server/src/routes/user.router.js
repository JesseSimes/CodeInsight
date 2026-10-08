const express = require('express')
const router = express.Router();
const {
    createUserController,
    loginUserController
} = require ('../controller/user.contoller')

//create user
router.post("/auth/register", createUserController);

//read user
router.get("/auth/login", loginUserController)

module.exports = router