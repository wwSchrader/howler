import express, { Router } from 'express';
import { default as User } from '../models/user';
const router = express.Router();

router.put('/register', (req: express.Request, res: express.Response) => {
  User.findOne({ username: req.body.username })
  .then((returnedUser) => {
    if (returnedUser) {
      console.log('username is already taken');
      res.status(200).json({ registrationStatus: false, reason: 'Username already taken!' });
    } else if (!req.body.password || req.body.password.length === 0) {
      console.log('no password');
      res.status(200).json({ registrationStatus: false, reason: 'Need a password' });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        authentication: {
          local: {
            password: req.body.password,
          },
        },
      });
      return newUser.save((err) => {
        if (err) {
          console.log(err.errors.username.message);
          let reasonMessage = null;
          if (err.name === 'ValidationError') {
            if (err.errors.username) {
              reasonMessage = err.errors.username.message;
            } else if (err.errors.email) {
              reasonMessage = err.errors.email.message;
            }
          } else {
            reasonMessage = 'Database error';
          }

          res.status(200).json({ registrationStatus: false, reason: reasonMessage });
        } else {
          console.log('User Saved');
          res.status(200).json({ registrationStatus: true });
        }
      });
    }
  })
  .catch((err) => {
    console.log('Error in searching for user');
    res.status(200).json({ registrationStatus: false, reason: 'Error in search' });
  });
});

export const users: Router = router;
