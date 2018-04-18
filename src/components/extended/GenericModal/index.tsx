import * as React from "react";
import * as Modal from "react-modal";
import "./GenericModal.css";

interface ModalState {
  modalIsOpen: boolean;
}

interface ModalProps {
  renderFunction: Function;
}

class GenericModal extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    console.info("We opened a modal");
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Contact Modal"
        >
          <h2>Hello</h2>
          {this.props.renderFunction()}
        </Modal>
      </div>
    );
  }
}

export default GenericModal;
