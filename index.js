const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;


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

        // get users
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);

            // print a message if no documents were found
            if ((await cursor.count()) === 0) {
                alert("No documents found!");
            };

            const user = await cursor.toArray();
            res.send(user)
        });

        app.get('/update/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.findOne(query);
            res.send(result);
        });

        // post user: create a user
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('adding new user:', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        });

        // update user
        app.put('/update/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const updateUser = req.body;
            const options = { upsert: true };

            const updatedUser = {
                $set: {
                    name: updateUser.name,
                    email: updateUser.email
                }
            }

            const result = await userCollection.updateOne(query, updatedUser, options);
            res.send(result);
        });

        // Delete a user
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }

            const result = await userCollection.deleteOne(query);
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