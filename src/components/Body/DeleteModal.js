import React, { Component } from 'react'
import Modal from 'react-modal'

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50,
    zIndex: 2
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 5,
    maxWidth: 500,
    maxHeight: 200,
    margin: '0 auto',
    padding: 30
  }
}

class SignInModal extends Component {
  render () {
    return (
      <Modal isOpen={this.props.isDeleteModalOpen} contentLabel='Modal' style={customStyles}>
        <h5 className='center'> Are you sure you want to delete this project along with all the attempts recorded? You cannot undo this action.</h5>
        <div className='row center'>
          <a className='waves-effect waves-dark btn' onClick={this.props.deletingProject}> Yes </a> &emsp;
          <a className='waves-effect waves-dark btn' onClick={this.props.toggleDeleteModal}> No </a>
        </div>
      </Modal>
    )
  }
}

export default SignInModal
