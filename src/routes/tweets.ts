import express, { Router } from 'express';
import { ensureAuthenticated } from '../component-passport';
import { default as Tweet } from '../../src/models/tweet';

const router = express.Router();

router.put('/add', ensureAuthenticated, (req, res) => {
  Tweet.create({ message: req.body.tweetMessage, ownerId: req.user._id })
  .then((result) => {
    res.json({ tweetPosted: true });
  })
  .catch((err) => {
    let message: string;
    if (
      err.errors.message === 'Text in message is required!' ||
      err.errors.message === 'Text in message exceeds 150 characters'
    ) {
      message = err.errors.message;
    } else {
      console.log(err);
      message = 'Server Error!';
    }
    res.status(500).json({ reason: message });
  });
});

export const tweets: Router = router;
