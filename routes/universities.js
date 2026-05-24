const express = require('express');
const router = express.Router();
const { db } = require('../firebase/admin');

// SEARCH UNIVERSITIES
router.get('/search', async (req, res) => {
  const { query, country, program, level, limit: limitParam, offset } = req.query;
  const limitNum = Math.min(parseInt(limitParam) || 50, 100);

  try {
    let ref = db.collection('universities');

    // Use Firestore query for country (exact match — efficient)
    if (country) {
      ref = ref.where('country', '==', country);
    }

    // Fetch with limit — Firestore can't do full-text search natively
    // so we fetch a batch and filter by name/program in JS
    // For country-only queries this is very fast
    // For text queries we fetch more and filter
    const fetchLimit = query ? 500 : limitNum;
    const snapshot = await ref.limit(fetchLimit).get();

    let universities = [];
    snapshot.forEach(doc => {
      universities.push({ id: doc.id, ...doc.data() });
    });

    // Filter by search query (name or city)
    if (query) {
      const q = query.toLowerCase();
      universities = universities.filter(u =>
        u.name?.toLowerCase().includes(q) ||
        u.city?.toLowerCase().includes(q) ||
        u.country?.toLowerCase().includes(q)
      );
    }

    // Filter by program
    if (program) {
      const p = program.toLowerCase();
      universities = universities.filter(u =>
        u.programs?.some(pr => pr.toLowerCase().includes(p))
      );
    }

    // Filter by level
    if (level) {
      universities = universities.filter(u =>
        u.level?.toLowerCase().includes(level.toLowerCase())
      );
    }

    // Sort by ranking
    universities.sort((a, b) => (a.ranking || 9999) - (b.ranking || 9999));

    // Paginate
    const start = parseInt(offset) || 0;
    const paginated = universities.slice(start, start + limitNum);

    res.status(200).json({
      universities: paginated,
      total: universities.length,
      limit: limitNum,
      offset: start
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET SINGLE UNIVERSITY
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('universities').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: 'University not found' });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
