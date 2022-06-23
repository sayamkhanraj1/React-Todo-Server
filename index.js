const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xqlz2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = client.db("Todo");
    const TodoCollection = database.collection("todoList");
    //add todo on server
    app.post("/addTodo", async (req, res) => {
      const addTodo = await TodoCollection.insertOne(req.body);
      res.send(addTodo);
    });
    // get all Todo
    app.get("/addTodos", async (req, res) => {
      const result = await TodoCollection.find({}).toArray();
      res.json(result);
    });
    //delete task
     app.delete("/addTodo/:id", async (req, res) => {
       const id = req.params.id;
       const query = { _id: ObjectId(id) };
       const result = await TodoCollection.deleteOne(query);
       res.json(result);
     });


  } finally {
    // await client.close();
  }
}

run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
