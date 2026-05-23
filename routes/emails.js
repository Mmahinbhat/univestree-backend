const express = require('express');
const router = express.Router();
const { db } = require('../firebase/admin');

router.post('/capture', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  try {
    // Check if already exists
    const existing = await db.collection('emails').where('email', '==', email).get();
    if (!existing.empty) {
      return res.status(200).json({ message: 'Already subscribed!' });
    }
    await db.collection('emails').add({
      email,
      createdAt: new Date(),
      source: 'homepage'
    });
    res.status(200).json({ message: 'Success' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
