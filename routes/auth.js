const express = require('express');
const router = express.Router();
const { admin, db } = require('../firebase/admin');

// SIGN UP
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name
    });

    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      createdAt: new Date().toISOString(),
      plan: 'free'
    });

    res.status(201).json({
      message: 'User created successfully',
      uid: userRecord.uid
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET USER PROFILE
router.get('/profile', async (req, res) => {
  const { uid } = req.query;

  try {
    const doc = await db.collection('users').doc(uid).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(doc.data());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
