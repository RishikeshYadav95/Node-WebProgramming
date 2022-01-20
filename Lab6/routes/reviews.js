const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.review;

router.get('/review/:id', async (req, res) => {
    try {
      const review = await reviewData.get(req.params.id);
      res.json(review);
    } catch (e) {
      res.status(404).json({ message: 'Review not found' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const reviewList = await reviewData.getAll(req.params.id);
        if(reviewList.length == 0){
            res.status(404).json({ message: 'Review not found' });
        }
        res.json(reviewList);
    } catch (e) {
        res.status(404).send();
    }
});

router.post('/:id', async (req, res) => {
    let revInfo = req.body;
  
    if (!revInfo) {
      res.status(400).json({ error: 'You must provide data to create a restaurant' });
      return;
    }
  
    if (!revInfo.title) {
      res.status(400).json({ error: 'You must provide a title' });
      return;
    }
  
    if (!revInfo.reviewer) {
      res.status(400).json({ error: 'You must provide a reviewer' });
      return;
    }

    if (!revInfo.rating) {
      res.status(400).json({ error: 'You must provide a rating' });
      return;
    }

    if (!revInfo.dateOfReview) {
      res.status(400).json({ error: 'You must provide a dateOfReview' });
      return;
    }

    if (!revInfo.review) {
        res.status(400).json({ error: 'You must provide a review ' });
        return;
      }
  
    try {
      const newRev = await reviewData.create(
        req.params.id,
        revInfo.title,
        revInfo.reviewer,
        revInfo.rating,
        revInfo.dateOfReview,
        revInfo.review
      );
      res.json(newRev);
    } catch (e) {
      res.sendStatus(500);
    }
  });

router.delete('/:id', async (req, res) => {
  try {
    const restaurant = await reviewData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ message: 'Review not found' });
  }
  try {
    await reviewData.remove(req.params.id);
    res.json({"restaurantId": req.params.id, "deleted": true});
  } catch (e) {
    res.status(500);
  }
});
module.exports = router;