import User from '../models/usermodel.js'
import bcrypt from 'bcryptjs';
import { genrateToken } from '../service/jwt.js';

const handelUserSignup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // console.log("req.body", req.body);
        
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
          }
        if (password.length < 6) {
            return res.status(400).json({ message: 'passowrd must be 6 letter!' })
        }
        const user = await User.findOne({ email })
        if(user) return res.status(400).json({ message: 'Email already exists!' })

        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log("hased paddword", hashedPassword);
        
        await User.create({ fullname, email, password: hashedPassword });
        return res.status(201).json({ message: 'User signup success' })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

const handelUserLogin = async(req, res) => {
    const { email, password } = req.body;
    console.log("req.body in login", req.body);
    
    try {
        const user = await User.findOne({ email });
        console.log("user details", user);
        
        if (!user) {
            return res.status(400).json({ msg: "Failed to authenticate" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

       const token = genrateToken(user._id, res);
        res.cookie("uid", token) 

        return res.status(200).json({ message: 'Login success' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

const handelUserLogout = (req, res) => {
    try {
        res.cookie("uid","")
        return res.status(200).json({message: "logout success"})
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error }); 
    }
}

const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export { handelUserLogin, handelUserLogout, handelUserSignup, checkAuth };
