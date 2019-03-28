import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {Home} from './Home';
import TweetTemplate from './TweetTemplate';

let props: any;

describe('Home', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    props = {
      getAllTweetsApi: jest.fn(),
      tweetArray: [
        {
          _id: 'dlsdkjflskjdf',
          date: Date.now(),
          message: 'This is a tweet! #yay',
          username: 'aproductiveuser123'
        },
        {
          _id: 'mifnjjklj',
          date: Date.now(),
          message: 'Just another message @everyone',
          username: 'anotherUser888'
        },
      ]
    }
    wrapper = shallow(<Home {...props}/>);
  });

  it('should render <div />', () => {
    expect(wrapper.find('div').length).toEqual(2);
  });

  it('should render <TweetTemplate />', () => {
    const passedProps = props.tweetArray.map((prop: any) => {
      return (
        <TweetTemplate 
            key={prop._id}
            date={prop.date}
            tweetMessage={prop.message}
            username={prop.username}
        />
      );
    });
    expect(wrapper.containsAllMatchingElements(passedProps)).toBe(true);
  });
});