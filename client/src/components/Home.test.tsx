import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {Home} from './Home';

describe('Home', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it('should render <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});