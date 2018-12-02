import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import NavigationBar from './NavigationBar';

describe('NavigationBar', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => wrapper = shallow(<NavigationBar />));

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});
