const userModels = require('../Models/User');
const storyModels = require('../Models/Story')

const jwt = require('jsonwebtoken');


//================================================register user======================================//
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
//=================================================login================================================//
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
        let token = jwt.sign(
            {
                userId: user._id.toString(),
                project: "1",
                Title: "Mini Blogging Site"
            }, "This is secret key")

         res.setHeader("x-auth-token", token);
       return res.status(200).send({ status: true, generatedToken: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Failed", msg: "Internal server error" });
    }
}
//======================================================save bookmark==========================================//
async function bookmark(req, res) {
    const { userId, storyId } = req.params;
    try {
        console.log(userId);
        const user = await userModels.findById(userId);
        const story = await storyModels.findById(storyId); 
        console.log(`user ${user}`);
        console.log(`story ${story}`);

        if (!user || !story) {
            return res.status(404).json({ message: "User or story not found." });
        }

        user.bookmarks.push(storyId);
        await user.save();

        res.status(200).json({ message: `Story bookmarked successfully for user.` });
    } catch (error) {
        console.error("Error while bookmarking:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

async function getAllusers(req, res) {
    try {
        
       

        const users = await userModels.find();

        return res.status(200).json({ status: "success", data: users });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "Failed", message: 'Something went wrong' })
    }
}
module.exports = { login, register, bookmark, getAllusers };
