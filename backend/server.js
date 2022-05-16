const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const taskModel = require('./schema');
const dbURL = "mongodb+srv://rominagh:Leoblomman14@cluster0.n5y9c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


mongoose.connect(dbURL, {

   useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => {
    console.log(`mongoose successfully connected`);
    
    }).catch((error) => {
    console.log(error)
    })

app.use(express.json())
app.use(cors());

app.post('/newTasks', async (req, res) => {
    const task = new taskModel(req.body);

    try {
        await task.save()
        res.send(task)
    } catch (error) {
        console.log(error)
    }
})

app.get('/get', async (req,res) => {
    const getTasks = await taskModel.find({})

    try {
        res.send(getTasks);
      } catch (error) {
        res.status(500).send(error);
      }
})


app.listen(5000, () => {
    console.log('Listening to port 5000')
})