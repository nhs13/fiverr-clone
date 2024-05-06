import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req,res,next) =>{
    // console.log(token);
    const token = req.cookies.accessToken;
    if(!token) return next(createError(401, "Not authenticated!"))

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload)=>{
        if(!token) return res.status(401).send("Token is not valid")
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
        next();
    })
}