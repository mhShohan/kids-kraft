const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const Toys = require('./Toys');
const Users = require('./Users');

const PORT = process.env.PORT || 5000;

//initialize app
const app = express();

//middleware
app.use(cors());
app.use(express.json());


const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();
        const Toy = new Toys(client);
        const User = new Users(client);

        //users route
        app.post('/users/register', (req, res) => User.register(req, res));
        app.post('/users/social-login', (req, res) => User.socialLogin(req, res));
        app.post('/users/token', (req, res) => User.token(req, res));

        //Toys route
        app.get('/toys', (req, res) => Toy.getToys(req, res));
        app.patch('/toys/:id', (req, res) => Toy.updateToy(req, res));
        app.delete('/toys/:id', (req, res) => Toy.deleteToy(req, res));
        app.get('/my-toys', (req, res) => Toy.myToys(req, res));
        app.get('/toys/all', (req, res) => Toy.allToys(req, res));
        app.get('/toys/:id', (req, res) => Toy.getSingleToy(req, res));
        app.post('/toys/add', (req, res) => Toy.addToy(req, res));
    } finally { console.log("MongoDB Connected!"); }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.status(200).send('Kids Kraft\'s Server is running! ');
});


app.listen(PORT, () => console.log(`server is Running on PORT:${PORT}`));