//THIS IS RootRouter

const express = require('express');
const router = express.Router();
const userRouter = require('../controller/user')
const accountRouter = require('../controller/account')

router.use("/user", userRouter)
router.use("/account", accountRouter)

module.exports = router;