const userModels = require('../Models/User');


const jwt = require('jsonwebtoken');



async function register(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ status: "Failed", msg: "Please enter username and password" });
        }


        const existingUser = await userModels.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ status: "Failed", msg: "Username already exists" });
        }


        const newUser = new userModels({ username, password });
        await newUser.hashPassword();
        await newUser.save();

        return res.status(201).json({ status: "success", data: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Failed", msg: "Internal server error" });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;


        if (!username || !password) {
            return res.status(400).json({ status: "Failed", msg: "Please enter username and password" });
        }


        const user = await userModels.findOne({ username });
        if (!user) {
            return res.status(404).json({ status: "Failed", msg: "User not found" });
        }


        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: "Failed", msg: "Invalid password" });
        }
        // Generate JWT token
        const token = jwt.sign({
            _id: user._id.toString(),
            project: "1",
            Title: "Mini Blogging Site"
        }, 'this is scret key');
        res.setHeader("x-auth-token", token);


        return res.status(200).json({ status: "success", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Failed", msg: "Internal server error" });
    }
}


module.exports = { login, register };
