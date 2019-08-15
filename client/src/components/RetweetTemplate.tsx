import React from 'react';
import './RetweetTemplate.css';

export interface IProps {
  date: Date,
  message: string,
  username: string,
};

export class RetweetTemplate extends React.Component<IProps> {
  public render() {
    return (
      <div className='Retweet'>
        <b>{this.props.username}</b>
        <p>{new Date(this.props.date).toDateString()}</p>
        <p>{this.props.message}</p>
      </div>
    );
  };
};

export default RetweetTemplate;