const express = require('express')
const cors = require('cors')
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/auth');

app.use(express.json())

function vaildEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


app.use(cors())
require('./db/connection')
const Users = require('./Models/User')

app.post('/signup', async (req, res) => {

    if (!vaildEmail(req.body.email)) {
        return res.status(400).send({ message: '👻 Invalid email' })
    }

    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send({ message: '👻 Name, email and password are required' })
    }

    const { email } = req.body

    const existingUser = await Users.findOne({ email: email })

    if (existingUser) {
        return res.status(400).send({ message: '😅 User with this email already exists' })
    }
    let user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        tasks: []
    })
    let result = await user.save()
    res.send(result)
})

// Sign-in endpoint
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: '🥷 Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: ' 🤡Invalid email or password' });
        }

        // Generate a token (optional)
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Sign-in successful', token, name: user.name });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.post('/tasks', authMiddleware, async (req, res) => {
    const task = req.body.task;

    req.user.tasks.push(task);
    await req.user.save();

    res.status(201).send(req.user.tasks);
});

app.get('/tasks', authMiddleware, async (req, res) => {
    res.send(req.user.tasks);
});

app.listen(8000)