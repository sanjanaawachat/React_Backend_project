const express = require('express');
 const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');
mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/productdb',
   {useNewUrlParser: true,useUnifiedTopology: true});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

app.post('/api/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send(product);
});

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
