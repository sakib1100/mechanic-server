const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { query } = require('express');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.4euscjg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

try{
await client.connect();


const InsertData = client.db('Mechanic-store').collection('insertData');


app.post('/dataInsert', async(req,res)=> {
const booking =  req.body;
const result = await InsertData.insertOne(booking);
res.send(result);
})
 

app.get('/GetData', async(req,res) => {
   const find = await InsertData.find({}).toArray();
   res.send(find);
})

app.delete('/GetData/:id', async(req,res) => {
const id = req.params.id;
const query = {_id: ObjectId(id)};
const result = await InsertData.deleteOne(query);
res.send(result)
  
})


app.get('/hero', (req,res) => {
  res.send('Hero meets Hero')
})



}

finally{

}
}

run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log('Example app listening on port', port)
})