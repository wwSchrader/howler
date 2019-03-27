import express, { Router } from 'express';
import { ensureAuthenticated } from '../component-passport';
import { default as Tweet } from '../../src/models/tweet';
import { default as User } from '../../src/models/user';

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

router.get('/all', (req, res) => {
  Tweet.find({})
  .then((tweetArray) => {
    const results = tweetArray.map((tweet) => {
      return User.findById(tweet.ownerId)
      .then((ownerObject) => {
        if (ownerObject) {
          return { ...tweet, ownerName: ownerObject.username };
        }

        // return tweet with null owner name if not found for some reason
        return { ...tweet, ownerName: null };
      });
    });

    // wait to resolve all of the .map promises
    return Promise.all(results).then(completed => completed);
  })
  .then((tweetArray) => {
    res.json({ tweets: tweetArray });
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
});

export const tweets: Router = router;
