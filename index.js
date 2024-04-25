const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const route  = require('./Routes/route');
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

mongoose.connect('mongodb+srv://admin:admin123@cluster0.qallvfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => { console.log('DB connected Successfully') })
    .catch((error) => { console.log("Something went wrong", error) })

app.use('/', route)
app.listen(port, function(){
    console.log(`Express is running `);
})
// const User = mongoose.model("User", {
//     username: String,
//     password: String
// })

// app.get('/login', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json({
//             status: "success",
//             data: users
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             status: "Failed",
//             message: 'Something went wrong'
//         })
//     }
// })

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         await User.create({
//             username: username,
//             password: password,
//         })
//         res.status(200).json({
//             status: 'Success'
//         })

//     } catch (error) {
//         res.status(500).json({
//             status: "Failed",
//             message: "Something went wrong"
//         })
//     }
// })

// app.patch('/login/:id', async (req, res) => {
//     const { id } = req.params;
//     const { username, password } = req.body
//     try {
//         await User.findByIdAndUpdate(id, {
//             username: username,
//             password: password
//         })
//         res.status(200).json({
//             status: 'Success',
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             status: "Failed",
//             "message": "Something went wrong"
//         })
//     }
// })


// const Story = mongoose.model( "Story", {
//     Heading: String,
//     Description: String,
//     Image: String,

// })

// app.get('/stories', async (req, res) => {
//     try {
//         const stories = await Story.find()
//         res.status(200).json({
//             status: "Success",
//             data: stories
//         })
//     }
//     catch (error) {
//         res.status(500).json({
//             status: "Failed",
//             'message': "Something went wrong"
//         })
//     }
// })

// app.post('/stories', async (req, res)=> {
//     const {Heading, Description, Image} = req.body;
//     try{
//         await Story.create({
//             Heading: Heading,
//             Description: Description,
//             Image: Image,
//         })
//         res.status(200).json({
//             status: "Success",
            
//         })
//     }catch(error){
//         console.log(error)
//         res.status(500).json({
//             status: "Failed",
//             "message": "Something went wrong"
//         })
//     }
// })

// app.patch('/stories/:id', async (req, res) => {
//     const { id } = req.params;
//     const { Heading, Description, Image } = req.body
//     try {
//         await User.findByIdAndUpdate(id, {
//             Heading: Heading,
//             Description: Description,
//             Image: Image,
//         })
//         res.status(200).json({
//             status: 'Success',
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             status: "Failed",
//             "message": "Something went wrong"
//         })
//     }
// })

// app.listen((3000), () => {
//     console.log(`first ${port}`)
// })