import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';

export class AddTweetForm extends React.Component<{}, {tweet: string}> {
  constructor(props: any) {
    super(props);

    this.state = {
      tweet: '',
    };
  };

  public handleOnTweetTextChange = (e: any) => {
    this.setState({tweet: e.target.value});
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

export default AddTweetForm;
