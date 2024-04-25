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

module.exports.createStory = createStory