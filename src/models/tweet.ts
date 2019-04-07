import mongoose from 'mongoose';
import { rejects } from 'assert';
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

export interface ITweet extends mongoose.Document {
  message: string;
  ownerId: string;
  date: number;
  retweetId?: string;
  hashtags: string[];
  mentions: string[];
  deleted: boolean;
}

const tweetSchema = new Schema({
  message: {
    type: String,
    required: [true, 'Text in message is required!'],
    maxlength: [150, 'Text in message exceeds 150 characters'],
  },
  ownerId: {
    type: String,
    required: [true, 'User id required!'],
  },
  date: {
    type: Number,
    default: Date.now(),
  },
  retweetId: {
    type: String,
    default: null,
    validate: {
      validator(v: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
          // if a tweet is not found, return false to trigger validation error
          Tweet.findById(v)
          .then((res: any) => {
            if (!res) {
              resolve(false);
            }
            resolve(true);
          })
          .catch((err) => {
            reject(false);
          });
        });
      },
      message: 'Matching tweet to retweetId is not found',
    },
  },
  replyId: {
    type: String,
    default: null,
    validate: {
      validator(v: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
          // if a tweet is not found, return false to trigger validation error
          Tweet.findById(v)
          .then((res: any) => {
            if (!res) {
              resolve(false);
            }
            resolve(true);
          })
          .catch((err) => {
            reject(false);
          });
        });
      },
      message: 'Matching tweet to replyId is not found',
    },
  },
  hashtags: [{
    type: String,
  }],
  mentions: [{
    type: String,
  }],
  deleted: {
    type: Boolean,
    default: false,
  },
});

tweetSchema.pre<ITweet>('validate', function (next) {
  const hashtagArray: any = this.message.match(/\B(\#[a-zA-Z0-9]+\b)(?!;)/g);
  this.hashtags = hashtagArray;
  const mentionsArray: any = this.message.match(/\B(\@[a-zA-Z0-9]+\b)(?!;)/g);
  this.mentions = mentionsArray;
  next();
});

const Tweet = mongoose.model<ITweet>('Tweet', tweetSchema);
export default Tweet;
