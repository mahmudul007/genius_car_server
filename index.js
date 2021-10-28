const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;
//middle wire
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.teo92.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {

        await client.connect();
        const database = client.db('carMechanic');
        const servicesCollection = database.collection('services');
        //get api
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);


        })

        //post api
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('hit the post api', service);

            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.send(result);

        });


        console.log('connected to database');

    }
    finally {

        //await client.close()
    }

}
run().catch(console.dir);













app.get('/', (req, res) => {
    res.send('running genius server');
})


app.listen(port, () => {
    console.log('running genius server on', port);
})