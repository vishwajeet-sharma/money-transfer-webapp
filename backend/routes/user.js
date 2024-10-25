const express = require('express');
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require('../db');
const { Account } = require('../db');
//const { JWT_SECRET } = require("../config");
require('dotenv').config();
const { authMiddleware } = require("../middleware")

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post("/signup", async (req, res) => {
    const {success} = signupBody.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message: "Email already taken / incorrect Inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken / incorrect Inputs"
        })
    }
    let user = null;
    try {
            user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
    }catch(err) {
        return res.status(411).json({
            message: "Email already taken / incorrect Inputs"
        })
    }

    const userId = user._id;

    // Create new account and assign random balance to user
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        message: "User created Successfully",
        token: token
    })
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {

    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
});

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information/ does not satisfy minimum requirements"
        })
    }
    await User.updateOne(req.body, {
        _id: req.userId
    })
    res.json({
        message: "Updated successfully"
    })
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
});



module.exports = router;