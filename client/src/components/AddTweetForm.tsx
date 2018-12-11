import React from 'react';
import {connect} from 'react-redux';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import {addTweetApi} from '../redux/actions/tweet';

export interface IPropsFromRedux {
  addTweetApi: (tweet: string) => void,
};

export interface IProps {
  tweet: string,
};

export class AddTweetForm extends React.Component<IPropsFromRedux, IProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      tweet: '',
    };
  };

  public handleOnTweetTextChange = (e: any) => {
    this.setState({tweet: e.target.value});
  };

  public onSubmit(e: any) {
    e.preventDefault();

    if (this.state.tweet.length > 0 && this.state.tweet.length < 151) {
      this.props.addTweetApi(this.state.tweet);
    };
  };

  public render() {
    return (
      <Form>
        <FormGroup>
          <Input 
            type='textarea'
            value={this.state.tweet}
            onChange={this.handleOnTweetTextChange}
          />
        </FormGroup>
        <Button>
          Howl
        </Button>
      </Form>
    );
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTweetApi: (tweet: string) => dispatch(addTweetApi(tweet)),
  };
};

export default connect(null, mapDispatchToProps)(AddTweetForm);
