const storyModels = require('../Models/Story');

async function createStory(req, res) {
    try {
        let data = req.body;
        let created_story = storyModels.create(data);
        return res.status(400).send({ status: "success", data: created_story });
    } catch (error) {
        console.log(`error ${error}`);
        return res.status(4500).send({ status: "Failed", msg: error.message });
    }
}

async function getAllStory(req, res) {
    try {
        const story = await storyModels.find();
        res.status(200).json({ status: "success", data: story })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "Failed", message: 'Something went wrong' })
    }
}

module.exports = {createStory, getAllStory}