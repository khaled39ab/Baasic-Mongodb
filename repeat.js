const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://dbuser1:S6HEPXaS.!nA4c4@cluster0.exvps.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db("repeatExpress").collection("user");

        app.post('/user', async (req, res) => {
            const newUser = req.body;
            // console.log('new user', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        });

        app.get('/user', async(req, res) => {
            const query = {};
            const cursor = userCollection.find(query);

            const result = await cursor.toArray();
            res.send(result)
        });
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello node')
});

app.listen(port, () => {
    console.log('Node is running');
});