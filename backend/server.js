const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dbURL = "mongodb+srv://rominagh:Leoblomman14@cluster0.n5y9c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


mongoose.connect(dbURL, {

   useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(()=>{
    console.log(`mongoose successfully connected`);
    
    }).catch((error) => {
    console.log(error)
    })



app.get('/', (req, res) => {
    res.send('Its working')
})

app.listen(5000, () => {
    console.log('Listening to port 5000')
})