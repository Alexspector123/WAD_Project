import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';
export async function signup(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!email) {
            return res.status(400).json({success: false, message: 'Please fill in email'});
        }
        if(!password) {
            return res.status(400).json({success: false, message: 'Please enter a password'});
        }
        if(!username) {
            return res.status(400).json({success: false, message: 'Please enter a username'});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({success: false, message: 'Invalid email'});
        }
        if(password.length < 6) {
            return res.status(400).json({success: false, message: 'Password must be at least 6 characters'});
        }
        const existingUserByEmail = await User.findOne({email: email});
        if (existingUserByEmail) {
            return res.status(400).json({success: false, message: 'User with this email already exists'});
        }
        const existingUserByUsername = await User.findOne({username: username})
        if (existingUserByUsername) {
            return res.status(400).json({success: false, message: 'User with this username already exists'});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            username
        });
        generateTokenAndSetCookie(newUser._id, res);
        const savedUser = await User.findById(newUser._id).select("-password");

        return res.status(201).json({
          success: true,
          message: "User created successfully",
          user: savedUser,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie('netflix-token');
        res.status(200).json({success: true, message: 'Logged out successfully'});
    } catch(error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export async function login(req, res) {
    
    try {
        const { email, password } = req.body;

        if(!email) {
            return res.status(400).json({success: false, message: 'Please fill in email'});
        }
        if(!password) {
            return res.status(400).json({success: false, message: 'Please enter a password'});
        }
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).json({success: false, message: 'Invalid credentials'});
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        }

        generateTokenAndSetCookie(user._id, res);
        // re-fetch or use .select() to omit password
        const loggedInUser = await User.findById(user._id).select("-password");

        return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user: loggedInUser,
        });
    } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function authCheck(req, res) {
    try {
      const userFromDb = await User.findById(req.user._id).select("-password");
      res.status(200).json({ success: true, user: userFromDb });
    } catch (error) {
      console.log("Error is authCheck function in controller", error.message);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
}
  
  