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
  console.log('this is the all route');
  new Promise(async (resolve, reject) => {
    resolve(Tweet.find({ replyId: null }).lean());
  })
  .then(async (tweetArray: any) => {
    const results = tweetArray.map((tweet: any) => {

      return new Promise(async(resolve, reject) => {
        resolve(User.findById(tweet.ownerId).lean());
      })
      .then((ownerObject: any) => {
        // athach owner object to tweet
        if (ownerObject) {
          return ({ ...tweet, username: ownerObject.username });
        }
      })
      .then((tweetObject) => {
        // attach retweeted tweets
        // another test line
        if (tweetObject.retweetId) {
          return Tweet.find({ retweetId: tweetObject.retweetId }).lean()
          .then((foundTweet) => {
            if (foundTweet) {
              tweetObject.retweet = foundTweet[0];
            }

            return tweetObject;
          });
        }

        return tweetObject;
      });
    });

    // wait to resolve all of the .map promises
    Promise.all(results)
    .then((finishedTweetArray) => {
      res.json({ tweets: finishedTweetArray });
    });
  })
  .catch((err) => {
    console.log('SOMETHING WENT WRONG!!!!!!');
    console.log(err);
    res.sendStatus(500);
  });
});

export const tweets: Router = router;
