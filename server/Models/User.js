const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: String,
    heading: String,
    description: String,
    priority: String,
    date: String,
    time: String,
    where: String
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tasks: [taskSchema]
});

module.exports = mongoose.model('users', userSchema);
