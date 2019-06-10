import React from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';

export class RetweetModal extends React.Component {
  public render() {
    return (
    <Modal>
      <ModalHeader>
        Rehowl this to EVERYONE
      </ModalHeader>
      <ModalBody>
        Retweet Modal
      </ModalBody>
    </Modal>
    );
  };
};

export default RetweetModal;