import React from 'react';
//import Steps from './Steps'
//import './css/List.css';

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class RequestModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    };
  }


  openModal (){
    this.setState({
      isOpen: true
    });
    this.props.directionsClick();
  };

  hideModal(){
    this.setState({
      isOpen: false
    });
  };


  render() {
    let subModalDialogStyles = {
      base: {
        bottom: -600,
        transition: 'bottom 0.4s'
      },
      open: {
        bottom: 0
      }
    };
    let {isOpen, isSubOpen} = this.state;
    //console.log("directions are:",this.props.item.directions)
    return (
        <div>
          <button className='list-location-button' onClick={this.openModal.bind(this)}>Get directions</button>
          <Modal isOpen={isOpen} size="modal-lg" onRequestHide={this.hideModal.bind(this)}>
            <ModalHeader >
              <h4>{this.props.item.name}</h4>
              <ModalClose onClick={this.hideModal.bind(this)}/>
            </ModalHeader>
            <div className='modal-inside'>
              <div>
                {this.props.item.directions && this.props.item.directions.map((x) => {
                  return (
                    <div>{x}</div>
                    )
                  })
                }
                </div>
              </div>
            </Modal>
        </div>
    );
  }
}

export default RequestModal;