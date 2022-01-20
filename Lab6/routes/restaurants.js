const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantData = data.restaurant;

router.get('/:id', async (req, res) => {
    try {
      const restaurant = await restaurantData.get(req.params.id);
      res.json(restaurant);
    } catch (e) {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  });

router.get('/', async (req, res) => {
    try {
      const restaurantList = await restaurantData.getAll();
      res.json(restaurantList);
    } catch (e) {
      res.status(500).send();
    }
  });

router.post('/', async (req, res) => {
    let restInfo = req.body;
  
    if (!restInfo) {
      res.status(400).json({ error: 'You must provide data to create a restaurant' });
      return;
    }
  
    if (!restInfo.name) {
      res.status(400).json({ error: 'You must provide a name' });
      return;
    }
  
    if (!restInfo.location) {
      res.status(400).json({ error: 'You must provide a location' });
      return;
    }

    if (!restInfo.phoneNumber) {
      res.status(400).json({ error: 'You must provide a phoneNumber' });
      return;
    }

    if (!restInfo.website) {
      res.status(400).json({ error: 'You must provide a website' });
      return;
    }

    if (!restInfo.priceRange) {
      res.status(400).json({ error: 'You must provide priceRange' });
      return;
    }

    if (!restInfo.cuisines) {
      res.status(400).json({ error: 'You must provide cuisines' });
      return;
    }

    if (!restInfo.serviceOptions) {
      res.status(400).json({ error: 'You must provide serviceOptions' });
      return;
    }
  
    try {
      const newRest = await restaurantData.create(
        restInfo.name,
        restInfo.location,
        restInfo.phoneNumber,
        restInfo.website,
        restInfo.priceRange,
        restInfo.cuisines,
        restInfo.serviceOptions
      );
      res.json(newRest);
    } catch (e) {
      res.sendStatus(500);
    }
  });
  
router.put('/:id', async (req, res) => {
  let restInfo = req.body;
  if(!restInfo.name){
    res.status(400).json({ error: 'You must provide name' });
    return;
  }

  if (!restInfo.location) {
    res.status(400).json({ error: 'You must provide a location' });
    return;
  }

  if (!restInfo.phoneNumber) {
    res.status(400).json({ error: 'You must provide a phoneNumber' });
    return;
  }

  if (!restInfo.website) {
    res.status(400).json({ error: 'You must provide a website' });
    return;
  }

  if (!restInfo.priceRange) {
    res.status(400).json({ error: 'You must provide priceRange' });
    return;
  }

  if (!restInfo.cuisines) {
    res.status(400).json({ error: 'You must provide cuisines' });
    return;
  }

  if (!restInfo.serviceOptions) {
    res.status(400).json({ error: 'You must provide serviceOptions' });
    return;
  }

  try {
    await restaurantData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ message: 'Restaurant not found' });
  }

  try{
    const newRest = await restaurantData.update(
      req.params.id,
      restInfo.name,
      restInfo.location,
      restInfo.phoneNumber,
      restInfo.website,
      restInfo.priceRange,
      restInfo.cuisines,
      restInfo.serviceOptions
    );
    res.json(newRest);
  }
  catch (e) {
    res.sendStatus(500);
    //res.json(e);
  }
});

router.delete('/:id', async (req,res) => {
  try {
    const restaurant = await restaurantData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ message: 'Restaurant not found' });
  }
  try {
    await restaurantData.remove(req.params.id);
    res.json({"restaurantId": req.params.id, "deleted": true});
  } catch (e) {
    res.status(500);
  }
});

  module.exports = router;