const express = require('express');
const router = express.Router();
const { db } = require('../firebase/admin');

// GET all applications for a user
router.get('/:uid', async (req, res) => {
  try {
    const snapshot = await db.collection('trackers').doc(req.params.uid).collection('applications').get();
    const applications = [];
    snapshot.forEach(doc => applications.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(applications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST add a new application
router.post('/:uid', async (req, res) => {
  const { universityId, universityName, logo, country, deadline, notes } = req.body;
  try {
    const ref = await db.collection('trackers').doc(req.params.uid).collection('applications').add({
      universityId: universityId || '',
      universityName,
      logo: logo || '',
      country: country || '',
      status: 'Researching',
      deadline: deadline || '',
      notes: notes || '',
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ id: ref.id, message: 'Application added!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH update status or notes
router.patch('/:uid/:appId', async (req, res) => {
  try {
    await db.collection('trackers').doc(req.params.uid).collection('applications').doc(req.params.appId).update(req.body);
    res.status(200).json({ message: 'Updated!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE an application
router.delete('/:uid/:appId', async (req, res) => {
  try {
    await db.collection('trackers').doc(req.params.uid).collection('applications').doc(req.params.appId).delete();
    res.status(200).json({ message: 'Deleted!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
