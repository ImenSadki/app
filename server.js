const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const Form = require('./models/Form');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Route de connexion
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ success: true, userId: user._id });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

// Route d'enregistrement
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  await newUser.save();
  res.json({ success: true });
});

// Route pour soumettre un formulaire
app.post('/api/submit-form', async (req, res) => {
  const { fileName, formData, userId } = req.body;
  const newForm = new Form({ fileName, formData, userId });
  await newForm.save();
  res.json({ success: true });
});

// Route pour récupérer les formulaires d'un utilisateur spécifique
app.get('/api/forms/:userId', async (req, res) => {
  const { userId } = req.params;
  const forms = await Form.find({ userId });
  res.json({ forms });
});

// Route pour récupérer le nombre total d'utilisateurs
app.get('/api/users/count', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.json({ count: userCount });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch user count' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
