const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;



const uri = "mongodb+srv://dbuser1:S6HEPXaS.!nA4c4@cluster0.exvps.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db("repeatExpress").collection("user");
        const user = {name: 'Mamun Munna', email: 'mamu@gmail.com'};

        const result = await userCollection.insertOne(user);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
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