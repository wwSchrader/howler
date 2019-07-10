import React from 'react';

export interface IProps {
  date: Date,
  message: string,
  username: string,
};

export class RetweetTemplate extends React.Component<IProps> {
  public render() {
    return (
      <div>
        <b>{this.props.username}</b>
        <p>{new Date(this.props.date).toDateString()}</p>
        <p>{this.props.message}</p>
      </div>
    );
  };
};

export default RetweetTemplate;