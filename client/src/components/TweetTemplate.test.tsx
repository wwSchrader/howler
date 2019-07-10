import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {TweetTemplate} from './TweetTemplate';

describe('TweetTemplate', () => {
  let wrapper: ShallowWrapper;
  let props: any;

  describe('Tweet without a retweet', () => {
    beforeEach(() => {
      props = {
        date: Date.now(),
        tweetMessage: 'This is a tweet message #test @everyone',
        username: 'someoneSpecial232'
      };
      wrapper = shallow(<TweetTemplate {...props}/>);
    });
  
    it('should render <div />', () => {
      expect(wrapper.find('div').length).toEqual(3);
    });
  
    it('should render <span />', () => {
      expect(wrapper.find('span').length).toEqual(2);
    });
  
    it('should render <b />', () => {
      expect(wrapper.find('b').length).toEqual(1);
    });
  
    it('should render <p />', () => {
      expect(wrapper.find('p').length).toEqual(2);
    });
  
    it('should render <RetweetTemplate />', () => {
      expect(wrapper.find('RetweetTemplate').length).toEqual(0);
    });
  });

  describe('Tweet with a retweet', () => {
    beforeEach(() => {
      props = {
        date: Date.now(),
        retweet: {
          date: Date.now(),
          message: 'this is the tweet that was retweeted',
          username: 'aRetweeterMan',
        },
        tweetMessage: 'This is a retweet message',
        username: 'someoneSpecial232',
      };
      wrapper = shallow(<TweetTemplate {...props}/>);
    });
  
    it('should render <div />', () => {
      expect(wrapper.find('div').length).toEqual(3);
    });
  
    it('should render <span />', () => {
      expect(wrapper.find('span').length).toEqual(2);
    });
  
    it('should render <b />', () => {
      expect(wrapper.find('b').length).toEqual(1);
    });
  
    it('should render <p />', () => {
      expect(wrapper.find('p').length).toEqual(2);
    });
  
    it('should render <RetweetTemplate />', () => {
      expect(wrapper.find('RetweetTemplate').length).toEqual(1);
    });
  });
});