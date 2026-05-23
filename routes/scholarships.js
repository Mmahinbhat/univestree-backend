const express = require('express');
const router = express.Router();
const { db } = require('../firebase/admin');

router.get('/search', async (req, res) => {
  const { query, country } = req.query;
  try {
    const snapshot = await db.collection('scholarships').get();
    let scholarships = [];
    snapshot.forEach(doc => scholarships.push({ id: doc.id, ...doc.data() }));
    if (query) scholarships = scholarships.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.university.toLowerCase().includes(query.toLowerCase()) ||
      s.country.toLowerCase().includes(query.toLowerCase())
    );
    if (country) scholarships = scholarships.filter(s => s.country.toLowerCase() === country.toLowerCase());
    res.status(200).json(scholarships);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

module.exports = router;
