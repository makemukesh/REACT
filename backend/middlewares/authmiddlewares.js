import jwt from "jsonwebtoken";
import User from "../models/User.js"

<<<<<<< HEAD
export const protect = async (req, res, next) =>{
    let token;

    if (req.headres.authorization){
        token = req.headres.authorization;

    }

    if(!token){
        return res.status(401).json({message:"Not authorized, token missing"});

    }

    try{
        const decoded = jwt.verify(token, 'MERNSTACKSECRETKEY');
        
        req.user = await user.findById(decoded.id).select("-password");

        next();

     }catch(error){
        res.status(401).json({message:"Invalid token"});
     }

};

export const adminOnly = (req,res,next)=>{
    if (req.user && req.user.role === "admin"){
        next();

    }else{
        res.status(403).json({message: "Admin access required"});
=======
export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization;
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, token missing" });
    }

    try {
        const decoded = jwt.verify(token, 'MERNSTACKSECRETKEY');

        req.user = await User.findById(decoded.id).select("-password");

        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }

};

export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();

    } else {
        res.status(403).json({ message: "Admin access required" });
>>>>>>> 699a03d (inital deployment)
    }
}