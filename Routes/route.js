const express = require('express');
const router = express.Router();
const storyController = require('../Controllers/StoryController')

router.post('/story', storyController.createStory)
router.post('/getAllStory', storyController.getAllStory)

module.exports = router