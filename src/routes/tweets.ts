import express, { Router } from 'express';
import { ensureAuthenticated } from '../component-passport';
import { default as Tweet } from '../../src/models/tweet';
import { default as User } from '../../src/models/user';

const router = express.Router();

router.put('/add', ensureAuthenticated, (req, res) => {
  Tweet.create({
    message: req.body.tweetMessage,
    ownerId: req.user._id,
    replyId: req.body.replyId ? req.body.replyId : null,
    retweetId: req.body.retweetId ? req.body.retweetId : null,
  })
  .then((result) => {
    res.json({ tweetPosted: true });
  })
  .catch((err) => {
    let message: string;
    if (
      err.errors.message === 'Text in message is required!' ||
      err.errors.message === 'Text in message exceeds 150 characters' ||
      err.errors.message === 'Matching tweet to retweetId is not found' ||
      err.errors.message === 'Matching tweet to replyId is not found'
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
  Tweet.find({ replyId: null }).lean().exec()
  .then(async (tweetArray) => {
    const results = tweetArray.map(async (tweet: any) => {
      return await User.findById(tweet.ownerId)
      .then((ownerObject) => {
        if (ownerObject) {
          return { ...tweet, username: ownerObject.username };
        }

        // return tweet with null owner name if not found for some reason
        return { ...tweet, username: null };
      });
    });

    // wait to resolve all of the .map promises
    return await Promise.all(results)
    .then((finishedTweetArray) => {
      return finishedTweetArray;
    });
  })
  .then((tweetArray) => {
    res.json({ tweets: tweetArray });
  })
  .catch((err) => {
    console.log('SOMETHING WENT WRONG!!!!!!');
    console.log(err);
    res.sendStatus(500);
  });
});

export const tweets: Router = router;
