import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ENV_VARS } from '../config/envVars.js';

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies['netflix-token'];

        if(!token) {
            return res.status(401).json({success: false, message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

        if(!decoded) {
            res.status(401).json({success: false, message: "Unauthorized"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            res.status(404).json({success: false, message: "User not found"});
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}