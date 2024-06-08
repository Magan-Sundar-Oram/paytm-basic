//THIS IS USER Router

const express = require("express");
const router = express.Router();
const { User, Account } = require('../db');
const zod = require('zod')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config');
const authMiddleware = require("../middleware/middleware");

router.get('/', (req, res) => {
    res.json("Hiii helloo")
})

const zodSchemaUser = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),
})

router.post('/signup', async (req, res) => {
    const reqObj = req.body;
    const zodResponse = zodSchemaUser.safeParse(reqObj);

    if (!zodResponse.success) {
        return res.status(400).json({
            message: 'Inputs Invalid!'
        })
    }
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(409).send({
                message: 'Email already taken or Incorrect Inputs!',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashpassword,
        });
        const userId = user._id;

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000,
        })

        const jwtToken = jwt.sign({ userId }, JWT_SECRET);
        return res.status(201).send({
            message: "User Created Successfully",
            token: jwtToken,
        });

    } catch (error) {
        return res.status(500).send({
            message: "DATABASE ERROR: " + error.message,
        });
    }
})


const zodSchemaSignin = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
})

router.get('/inuser', authMiddleware, async (req, res) => {
    try {
        const loggedInUser = await User.findOne({ _id: req.userId });
        return res.status(201).send({
            userData: {
                username: loggedInUser.username,
                email: loggedInUser.email,
                userId: loggedInUser._id
            }
        })
    } catch (error) {
        return res.status(400).send({
            message: "DATABASE ERROR" + error
        })
    }
})

router.post('/signin', async (req, res) => {
    const reqObj = req.body;
    const zodResponse = zodSchemaSignin.safeParse(reqObj);
    if (!zodResponse.success) {
        return res.status(401).send({
            message: 'Invalid Inputs!'
        })
    }

    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            return res.status(411).send({
                message: 'Invalid Email or Password!',
            });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, existingUser.password);
        if (!isPasswordValid || existingUser.email !== req.body.email) {
            return res.status(401).send({
                message: "Wrong Credentials!",
            })
        }
        const userId = existingUser._id;
        const jwtToken = jwt.sign({ userId }, JWT_SECRET);
        return res.status(200).send({
            message: "Login Successful :)",
            token: jwtToken,
        })
    } catch (error) {
        return res.status(400).send({
            message: "DATABASE ERROR" + error
        })
    }

})


// router.put('/update', authMiddleware, async (req, res) => {
//     const userId = req.userId;
//     const zodResponse = zodSchemaUser.safeParse(req.body);
//     if (!zodResponse.success) {
//         return res.status(400).send({
//             message: 'Invalid Inputs!'
//         })
//     }

//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashpassword = await bcrypt.hash(req.body.password, salt);

//         const updatedUser = await User.findOneAndUpdate(
//             { _id: userId },
//             {
//                 $set: {
//                     username: req.body.username,
//                     email: req.body.email,
//                     password: hashpassword,
//                 }
//             },
//             { new: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).send({
//                 message: "User Not Found!"
//             })
//         }
//         return res.status(200).send({
//             message: "User Information Updated Successfully :)"
//         })
//     } catch (error) {
//         return res.status(401).send({
//             message: "DATABASE ERROR" + error
//         })
//     }
// })

router.put('/update', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const { username, email, password, newPassword } = req.body;

    if (!username || !email) {
        return res.status(400).send({ message: 'Username and email are required.' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Current password is incorrect.' });
        }

        const updateData = { username, email };

        if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashNewPassword = await bcrypt.hash(newPassword, salt);
            updateData.password = hashNewPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found.' });
        }

        return res.status(200).send({ message: 'User information updated successfully.' });
    } catch (error) {
        return res.status(500).send({ message: 'Database error: ' + error.message });
    }
});


router.delete('/delete-user', authMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
        await User.findByIdAndDelete(userId);
        await Account.findOneAndDelete({ userId });
        return res.status(200).send({ message: 'User account deleted successfully.' });
    } catch (error) {
        return res.status(500).send({ message: 'Database error: ' + error.message });
    }
});


router.post('/validate-password', authMiddleware, async (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).send({ message: 'Current password is required.' });
    }

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Current password is incorrect.' });
        }

        return res.status(200).send({ message: 'Password is valid.' });
    } catch (error) {
        return res.status(500).send({ message: 'Database error: ' + error.message });
    }
});

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter;

    try {
        const users = await User.find({
            $or: [{
                username: {
                    "$regex": filter
                }
            }, {
                email: {
                    "$regex": filter
                }
            }]
        });
        return res.status(200).json({
            users: users.map((user) => ({
                username: user.username,
                email: user.email,
                _id: user._id
            }))
        })
    } catch (error) {
        return res.status(401).send({
            message: "DATABASE ERROR" + error
        })
    }
})

module.exports = router;