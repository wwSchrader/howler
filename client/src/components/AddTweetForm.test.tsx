import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import '../setupTests';
import {AddTweetForm} from './AddTweetForm';

describe('AddTweetForm', () => {
  let wrapper: ShallowWrapper;
  let instance: AddTweetForm;

  beforeEach(() => {
    wrapper = shallow(<AddTweetForm />);
  });

  it('should render a <Form />', () => {
    expect(wrapper.find('Form').length).toEqual(1);
  });

  it('should render a <FormGroup />', () => {
    expect(wrapper.find('FormGroup').length).toEqual(1);
  });

  it('should render a <Input />', () => {
    expect(wrapper.find('Input').length).toEqual(1);
  });

  it('should render a <Button />', () => {
    expect(wrapper.find('Button').length).toEqual(1);
  });

  describe('handleOnTweetTexChange function', () => {
    beforeEach(() => {
      instance = wrapper.instance() as AddTweetForm;
    });

    it('should set the state of tweet to the input text', () => {
      const testTweet = 'This is a test tweet #test';
      instance.handleOnTweetTextChange({target: {value: testTweet}});
      expect(wrapper.state('tweet')).toEqual(testTweet);
    });
  });
});