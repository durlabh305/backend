const express = require('express');
const router = express.Router();
const storyController = require('../Controllers/StoryController')

router.post('/story', storyController.createStory)
router.get('/getAllStory', storyController.getAllStory)
router.put('/editStory/:id', storyController.editStory)

module.exports = router