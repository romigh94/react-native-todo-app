const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    task: {
        type: String,
        required: true,
    }
})

const Tasks = mongoose.model("Tasks", TaskSchema);

module.exports = Tasks;
