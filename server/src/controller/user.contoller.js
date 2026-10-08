const User = require("../models/user.models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
let jwtSecret = process.env.JWT_SECRET

const createUserController = async (req,res) => {
    try {
        const{name, email, password} = req.body

        const hashPassword = await bcrypt.hash(password,10);

        const duplicateUser = await User.findOne({email})

        if(duplicateUser)
        {
            return res.status(400).json({
                message:"User exists"
            })
        }

        const user = await User.create({
            name,
            email,
            password: hashPassword
        })

    const token=jwt.sign(
        {
        id: user._id,
        name: user.name,
        email: user.email
    },
        jwtSecret
    )

    res.status(201).json({
        message: "User created successfully",
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        }
    })
    } catch (error) {
        console.log("Internal server error", error)

        res.status(500).json({
            message:"Internal server error"
        })
    }
}

const loginUserController = async (req,res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }

        const passwordCheck = await bcrypt.compare(
            password,
            user.password
        )

        if(!passwordCheck){
            return res.status(401).json({
                message:"Incorrect password"
            })
        }

        const token  =jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email
            },
            jwtSecret
        )

        res.status(200).json({
            message:"Successful login",
            data:{
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            }
        })


    } catch (error) {
        console.log("User not found", error)

        res.status(500).json({
            message:"Internal server error"
        })
    }
}


module.exports = {
    createUserController,
    loginUserController
}