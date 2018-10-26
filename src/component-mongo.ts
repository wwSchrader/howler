import express from 'express';
import mongoose = require('mongoose');
export const db = mongoose.connection;

export const setupMongoose: (app: express.Application) => void = (app: express.Application) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI as string, { useNewUrlParser: true });
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', () => {
    console.log('MongoDB connected!');
  });
};
