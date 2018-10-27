import connectFlash from 'connect-flash';
import connectRedis = require('connect-redis');
import 'dotenv';
import express from 'express';
import expressSession from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import { default as User } from './models/user';

const REDIS_STORE = connectRedis(expressSession);
const LOCAL_STRATEGY = passportLocal.Strategy;

export const setupPassport: (app: express.Application) => void = (app: express.Application) => {
  app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET as string,
    store: new REDIS_STORE({
      url: process.env.REDIS_URL as string,
    }),
  }));

  passport.serializeUser<any, any>((user, done) => {
    done(undefined, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user ? user : undefined);
    });
  });

  app.use(connectFlash());
  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * Sign in using Email and Password.
   */
  passport.use(new LOCAL_STRATEGY({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
      if (err) { return done(err); }
      if (!user) {
        return done(undefined, false, { message: `Email ${email} not found.` });
      }
      user.comparePassword(password, (errObj: Error, isMatch: boolean) => {
        if (errObj) { return done(errObj); }
        if (isMatch) {
          return done(undefined, user);
        }
        return done(undefined, false, { message: 'Invalid email or password.' });
      });
    });
  }));
};
