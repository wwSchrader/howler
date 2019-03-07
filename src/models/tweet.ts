import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface ITweet extends mongoose.Document {
  message: string;
  ownerId: string;
  date: number;
  retweetId: string;
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

const Tweet = mongoose.model('Tweet', tweetSchema);
export default Tweet;
