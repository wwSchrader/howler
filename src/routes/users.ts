import express, { Router } from 'express';
import { default as User } from '../models/user';
import bcrypt from 'bcrypt';
import { loginUser, passport } from '../component-passport';
const saltRounds = 12;

const router = express.Router();

router.put('/register', (req: express.Request, res: express.Response) => {
  User.findOne({ username: req.body.username })
  .then((returnedUser) => {
    if (returnedUser) {
      res.status(200).json({ registrationStatus: false, reason: 'Username already taken!' });
    } else if (!req.body.password || req.body.password.length === 0) {
      res.status(200).json({ registrationStatus: false, reason: 'Need a password!' });
    } else {
      return bcrypt.hash(req.body.password, saltRounds)
      .then((hashedPassword) => {
        return User.create(
          {
            username: req.body.username,
            email: req.body.email,
            authentication: {
              local: {
                password: hashedPassword,
              },
            },
          },
        );
      })
      .then((err: any) => {
        if (err) {
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

router.post(
  '/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (!user) {
        res.status(401).json({ isLoggedIn: false, authMessage: info.authMessage });
      } else if (!err && user) {
        req.user = user;
        next();
      } else {
        res.status(500).send();
      }
    })(req, res, next);
  },
  loginUser,
);

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ isLoggedIn: false });
});

export const users: Router = router;
