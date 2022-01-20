const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.people;

router.get('/:id', async (req, res) => {
  try {
    const people = await peopleData.getPersonById(req.params.id);
    res.json(people);
  } catch (e) {
    res.status(404).json({ message: 'Person not found' });
  }
});

router.get('/', async (req, res) => {
  try {
    const peopleList = await peopleData.getPeople();
    res.json(peopleList);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/', async (req, res) => {
  // Not implemented
  res.status(501).send();
});

module.exports = router;