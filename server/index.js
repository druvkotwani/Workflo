const express = require('express')
const cors = require('cors')
const app = express();
app.use(express.json())

// mongodb+srv://hackerdruv:1UXkGzGuWZRBg28Z@workflo.skbz2gj.mongodb.net/

// 1UXkGzGuWZRBg28Z

// mongodb+srv://hackerdruv:1UXkGzGuWZRBg28Z@workflo.skbz2gj.mongodb.net/workflo?retryWrites=true&w=majority&appName=workflo

app.use(cors())
require('./db/connection')
const Users = require('./Models/User')

app.post('/signup', async (req, res) => {

    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'Name, email and password are required' })
    }

    const { email } = req.body

    const existingUser = await Users.findOne(
        { email: email }
    )

    if (existingUser) {
        return res.status(400).send({ message: 'User with this email already exists' })
    }


    let user = new Users(req.body)
    let result = await user.save()
    res.send(result)



})

app.listen(8000)