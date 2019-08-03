import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {HomePageTweet} from './HomePageTweet';

describe('HomePageTweet', () => {
  let wrapper: ShallowWrapper;
  let props: any;

  beforeEach(() => {
    props = {
      date: Date.now(),
      tweetId: '12312asddas',
      tweetMessage: 'Home page Tweet #home',
      username: 'ortauberman',
    };
    wrapper = shallow(<HomePageTweet {...props}/>);
  });

  it('should render <div />', () => {
    expect(wrapper.find('div').length).toEqual(2);
  });

  it('should render <TweetTemplate />', () => {
    expect(wrapper.find('TweetTemplate').length).toEqual(1);
  });

  it('should render <button />', () => {
    expect(wrapper.find('button').length).toEqual(2);
  });

  it('should render <ReplyTweetModal />', () => {
    expect(wrapper.find('Connect(ReplyTweetModal)').length).toEqual(1);
  });

  it('should render <RetweetModal />', () => {
    expect(wrapper.find('Connect(RetweetModal)').length).toEqual(1);
  });
});