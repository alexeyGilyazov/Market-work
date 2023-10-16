const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 8888

const server_url = 'mongodb://localhost:27017';
const client = new MongoClient(server_url);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    // process.exit(1);
  }
}

connectDB();
app.use(express.json());
app.use(cors());

const db = client.db('react-market-app');

//получение списка товаров
app.get('/products', async (req, res) => {
  const products = await db.collection('products').find().toArray();
  res.json(products);
})

//получение товара по id
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  res.json(product);
})

// добавление товара 
app.post('/products', async (req, res) => {
  await db.collection('products').insertOne(req.body);
  res.json({ message: 'Product added successfully' });
})

//изменение товара 
app.put('/products/:id', async (req, res) => {
  await db.collection('products').updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
  res.json({ message: 'Product updated successfully' });
})

//удаление товара 
app.delete('/products/:id', async (req, res) => {
  await db.collection('products').deleteOne({ _id: ObjectId(req.params.id) })
  res.json({ message: 'Product deleted successfully' });
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
