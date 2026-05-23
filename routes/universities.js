const express = require('express');
const router = express.Router();
const { db } = require('../firebase/admin');

// SEARCH UNIVERSITIES
router.get('/search', async (req, res) => {
  const { query, country, program } = req.query;

  try {
    let ref = db.collection('universities');
    const snapshot = await ref.get();

    let universities = [];
    snapshot.forEach(doc => {
      universities.push({ id: doc.id, ...doc.data() });
    });

    // Filter by search query
    if (query) {
      universities = universities.filter(u =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.country.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by country
    if (country) {
      universities = universities.filter(u =>
        u.country.toLowerCase() === country.toLowerCase()
      );
    }

    // Filter by program
    if (program) {
      universities = universities.filter(u =>
        u.programs && u.programs.some(p =>
          p.toLowerCase().includes(program.toLowerCase())
        )
      );
    }

    res.status(200).json(universities);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET SINGLE UNIVERSITY
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('universities').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'University not found' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;