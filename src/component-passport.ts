import { connectRedis } from './session';
import cookieParser from 'cookie-parser';
import 'dotenv';
import express, { NextFunction } from 'express';
import expressSession from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import { default as User } from './models/user';
import bcrypt from 'bcrypt';

const REDIS_STORE = connectRedis(expressSession);
const LOCAL_STRATEGY = passportLocal.Strategy;

const authenticate = passport.authenticate;

const setupPassport: (app: express.Application) => void = (app: express.Application) => {
  app.use(expressSession({
    cookie: { maxAge: 86400000 },
    name: 'sessionId',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET as string,
    store: new REDIS_STORE({
      url: process.env.REDIS_URL,
    }),
  }));

  app.use(cookieParser());

  passport.serializeUser<any, any>((user, done) => {
    console.log('serialize user');
    done(undefined, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      console.log('deserialize user');
      done(err, user ? user : undefined);
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * Sign in using Email and Password.
   */
  passport.use(new LOCAL_STRATEGY(
    { passReqToCallback: true }, (req: any, usernm: string, password: string, done: any) => {
      console.log('Local Strategy called');
      User.findOne({ username: usernm }, (err, user: any) => {
        if (err) { return done(err); }
        if (!user) {
          console.log('username not found');
          return done(undefined, false, { authMessage: 'Username not found!' });
        }
        bcrypt.compare(password, user.authentication.local.password)
        .then((res) => {
          if (res) {
            console.log('username and password match');
            return done(undefined, user);
          }
          console.log('"password not found"');
          return done(undefined, false, { authMessage: 'Incorrect password!' });
        })
        .catch((error: any) => {
          console.log('"Error in authentication!"');
          return done(error);
        });
      });
    }),
  );
};

const ensureAuthenticated = (req: any, res: any, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.sendStatus(401);
};

const checkSession = (req: any) => {
  return req.isAuthenticated();
};

const loginUser = (req: any, res: any, next: NextFunction) => {
  console.log('loginUser called');
  req.logIn(req.user, (error: any) => {
    if (error) {
      console.log('Error in logIn');
      throw error;
    } else {
      res.json({ isLoggedIn: true, userId: req.user });
    }
  });
};

export {
  setupPassport,
  passport,
  ensureAuthenticated,
  loginUser,
  authenticate,
  checkSession,
};
