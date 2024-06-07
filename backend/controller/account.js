const express = require('express');
const authMiddleware = require('../middleware/middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    userId = req.userId;
    try {
        const account = await Account.findOne({
            userId: userId,
        })
        res.json({
            balance: account.balance,
        })
    } catch (error) {
        res.status(401).send({
            message: "DATABASE ERROR" + error
        })
    }
})

router.post("/transfer", authMiddleware, async (req, res) => {
    try {
        const session = await mongoose.startSession();

        session.startTransaction();
        const { amount, to } = req.body;

        const fromAccount = await Account.findOne({ userId: req.userId }).session(session);

        if (!fromAccount || fromAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient Balance!"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Account!"
            });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session)

        await session.commitTransaction();
        res.json({
            message: "Transfer Successful!"
        })

    } catch (error) {
     
        return res.status(401).json(
            {
                message: "DATABASE ERROR" + error
            }
        )
    }
})

module.exports = router