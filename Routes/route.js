const express = require('express');
const router = express.Router();
const storyController = require('../Controllers/StoryController')
const userController = require('../Controllers/UserController')
const {authentication} = require('../middleware/authenticate')

//story api
router.post('/story', storyController.createStory)
router.get('/getAllStory', authentication, storyController.getAllStory)
router.put('/editStory/:id', storyController.editStory)
router.get('/getLink/:id', storyController.getLink)

// users api
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/users/:userId/bookmark/:storyId', userController.bookmark)
router.get('/getAllUsers', userController.getAllusers)

module.exports = router