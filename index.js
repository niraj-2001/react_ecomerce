const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// App Setup
const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected!'))
.catch((err) => console.error('DB connection error:', err));

// Define Order Schema
const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
});

const Order = mongoose.model('Order', orderSchema);

// ✅ Form Submit API
app.post('/submit-order', async (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    const newOrder = new Order({
      name,
      email,
      phone,
      address,
    });
    await newOrder.save();
    res.json({ message: 'Order placed successfully!' });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
