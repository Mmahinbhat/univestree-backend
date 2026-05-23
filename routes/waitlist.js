const express = require('express');
const router = express.Router();
const { db } = require('../firebase/admin');

router.post('/', async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const existing = await db.collection('waitlist')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (!existing.empty) {
      return res.status(409).json({ error: 'You are already on the waitlist!' });
    }

    await db.collection('waitlist').add({
      name,
      email,
      joinedAt: new Date().toISOString()
    });

    res.status(201).json({ message: 'Successfully joined the waitlist!' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
