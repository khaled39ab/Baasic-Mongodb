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

       app.post('/user', (req, res) =>{
        const newUser = req.body;
        console.log('adding new user:', newUser);
        res.send('send data receive')
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