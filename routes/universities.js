const express = require('express');
const router = express.Router();
const { db } = require('../firebase/admin');

// Cache to avoid fetching all docs on every request
let cache = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getAllUniversities() {
  if (cache && Date.now() - cacheTime < CACHE_TTL) return cache;
  const snapshot = await db.collection('universities').get();
  cache = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  cacheTime = Date.now();
  return cache;
}

// SEARCH UNIVERSITIES
router.get('/search', async (req, res) => {
  const { query, country, program, level, limit: limitParam, offset } = req.query;
  const limitNum = Math.min(parseInt(limitParam) || 48, 100);
  const start = parseInt(offset) || 0;

  try {
    let universities = await getAllUniversities();

    // Filter by country
    if (country) {
      universities = universities.filter(u =>
        u.country?.toLowerCase() === country.toLowerCase()
      );
    }

    // Filter by search query
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

    // Sort by ranking (unranked go to end)
    universities.sort((a, b) => {
      const ra = parseInt(a.ranking) || 99999;
      const rb = parseInt(b.ranking) || 99999;
      return ra - rb;
    });

    const total = universities.length;
    const paginated = universities.slice(start, start + limitNum);

    res.status(200).json({
      universities: paginated,
      total,
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
