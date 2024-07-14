require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const PasswordModel = require('./models/passwordSchema');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("Db connected"); })
    .catch(err => { console.log(err) })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    PasswordModel.find({}).then(data => {
        res.json(data)
    })
})

app.post('/', (req, res) => {
    const { site, username, password } = req.body;
    const newPassword = new PasswordModel({ site: site, username: username, password: password });
    newPassword.save().then(() => {
        res.send({ "msg": "success" });
    });
})

app.put('/:id', (req, res) => {

    const { site, username, password } = req.body;
    const id = req.params.id;
    PasswordModel.findByIdAndUpdate(id, { site: site, username: username, password: password }).then(() => {
        res.send({ "msg": "success" });
    })
})

app.delete('/:id', (req, res) => {
    PasswordModel.deleteOne({ _id: req.params.id }).then(() => {
        console.log("success");
    })
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})