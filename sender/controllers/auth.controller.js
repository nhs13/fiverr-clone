import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createError from "../utils/createError.js"

export const register = async (req,res, next)=>{
    try{
        const hash = bcrypt.hashSync(req.body.password, 5)
        const newUser = new User({
            ...req.body,
            password: hash,
        })

        await newUser.save();
        res.status(201).send("User has been created")
    }catch(err){
        // res.status(500).send("Something went wrong")
        next(err)
    }
}

export const login = async (req,res, next)=>{
    try{
        // getting the user info from the db
        const user = await User.findOne({username: req.body.username})
        if(!user) return next(createError(404, "User not found!"));

        // checking if the entered pass matches with the og
        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if(!isCorrect) return next(createError(400, "Wrong password or username!"))

        // jwt auth
        const token = jwt.sign(
            {
                id: user._id,
                isSeller: user.isSeller,
            },
            process.env.JWT_SECRET
        )

        // rendering the details of the user, if pass is correct
        const {password, ...info} = user._doc
        // httpOnly, so that client-side scripts, including JavaScript
        // cannot access our cookie
        res.cookie("accessToken", token, {httpOnly: true}).status(200).send(info)
    }catch(err){
        res.status(500).send("Something went wrong")
    }
}

// A cookie is a small piece of data that a server sends to the client's browser, and the browser stores it locally.
// sending a jwt using a cookie, means that the JWT is being stored in a cookie on the client's side 
export const logout = async (req,res)=>{
    res.clearCookie("accessToken", {
        samesite: "none",
        secure: true,
    }).status(200).send("User has been logged out")
}