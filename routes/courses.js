const express = require('express');
const router = express.Router();
const { db } = require('../firebase/admin');

router.get('/search', async (req, res) => {
  const { query, field } = req.query;
  try {
    const snapshot = await db.collection('courses').get();
    let courses = [];
    snapshot.forEach(doc => courses.push({ id: doc.id, ...doc.data() }));
    if (query) courses = courses.filter(c =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.field.toLowerCase().includes(query.toLowerCase()) ||
      c.university.toLowerCase().includes(query.toLowerCase())
    );
    if (field) courses = courses.filter(c => c.field.toLowerCase() === field.toLowerCase());
    res.status(200).json(courses);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

module.exports = router;
