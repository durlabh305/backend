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

async function editStory(req, res) {
    try {
        let { title, content, likes } = req.body;
        const storyId = req.params.id;
        let updateLikes = await storyModels.findById("likes", storyId)
        //fetch total likes of story +1 if user like the story -1 when user dislikes the story 
        const updatedStory = await storyModels.findByIdAndUpdate(storyId, { title, content, likes }, { new: true });
       return res.status(200).json({ message: 'Story updated successfully', story: updatedStory });
    } catch (error) {
       return res.status(500).json({ error: 'Internal server error' });
      }
}

async function getAllStory(req, res) {
    try {
        const story = await storyModels.find();
        return res.status(200).json({ status: "success", data: story })
    } catch (error) {
        console.log(error)
       return res.status(500).json({ status: "Failed", message: 'Something went wrong' })
    }
}

module.exports = {createStory, getAllStory, editStory}