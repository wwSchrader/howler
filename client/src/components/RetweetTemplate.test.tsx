import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {RetweetTemplate} from './RetweetTemplate';

describe('RetweetTemplate', () => {
  let wrapper: ShallowWrapper;
  let props: any;

  beforeEach(() => {
    props = {
      date: Date.now(),
      message: 'This is a retweet string',
      username: 'mrRetweeter',
    };
    wrapper = shallow(<RetweetTemplate {...props}/>);
  });

  it('should render <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});