import User from '../models/usermodel.js'
import bcrypt from 'bcryptjs';
import { genrateToken } from '../service/jwt.js';

const handelUserSignup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'passowrd must be 6 letter!' })
        }
        const user = await User.findOne({ email })

        if (user) return res.status(400).json({ message: 'Email already exists!' })

        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log("hased paddword", hashedPassword);
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            // generate jwt token here
            genrateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

const handelUserLogin = async (req, res) => {
    const { email, password } = req.body;
    // console.log("req.body in login", req.body);

    try {
        const user = await User.findOne({ email });
        // console.log("user details", user);

        if (!user) {
            return res.status(400).json({ msg: "Failed to authenticate" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        genrateToken(user._id, res);
        // res.cookie("uid", token)

        return res.status(200).json({ message: 'Login success' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

const handelUserLogout = (req, res) => {
    try {
        res.cookie("uid", "")
        return res.status(200).json({ message: "logout success" })
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
