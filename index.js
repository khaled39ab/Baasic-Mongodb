const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())


//username:dbuser1 
//password:S6HEPXaS.!nA4c4


const uri = "mongodb+srv://dbuser1:S6HEPXaS.!nA4c4@cluster0.exvps.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db("foodExpress").collection("user");

        app.get('/user', async(req, res) => {
            const query = {};
            const cursor = userCollection.find(query);

            // print a message if no documents were found
            if ((await cursor.count()) === 0) {
                console.log("No documents found!");
            };

            const user = await cursor.toArray();
            res.send(user)
        });

        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('adding new user:', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        });

    } finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running my node in CRUD server')
});

app.listen(port, () => {
    console.log('CRUD server is running');
})