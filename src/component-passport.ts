import connectRedis = require('connect-redis');
import cookieParser from 'cookie-parser';
import 'dotenv';
import express from 'express';
import expressSession from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import { default as User } from './models/user';
import bcrypt from 'bcrypt';

const REDIS_STORE = connectRedis(expressSession);
const LOCAL_STRATEGY = passportLocal.Strategy;

const setupPassport: (app: express.Application) => void = (app: express.Application) => {
  app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET as string,
    store: new REDIS_STORE({
      url: process.env.PORT,
    }),
  }));

  app.use(cookieParser());

  passport.serializeUser<any, any>((user, done) => {
    done(undefined, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
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

export {
  setupPassport,
  passport,
};
