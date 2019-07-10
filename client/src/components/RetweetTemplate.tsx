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
        RetweetTemplate is here
      </div>
    );
  };
};

export default RetweetTemplate;