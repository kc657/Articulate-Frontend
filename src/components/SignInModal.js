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
    maxHeight: 400,
    margin: '0 auto',
    padding: 30
  }
}

class SignInModal extends Component {
  render () {
    return (
      <Modal className='row' isOpen={this.props.isSignInOpen} id='signupModal' contentLabel='Modal' style={customStyles}>
        <form className='row m12 center' onSubmit={this.props.handleSubmit}>
          <div className='col m12 valign-wrapper'>
            <div className='col m11'>
              <h3>Welcome Back</h3>
            </div>
            <div className='col m1'>
              <a onClick={this.props.toggleSignInModal} className='btn-sm waves-light right'>X</a>
            </div>
          </div>
          <div className='input-field col m6 offset-3'>
            <input data-id-type='userName' type='text' className='validate' onChange={this.props.handleChange} />
            <label htmlFor='userName'>User Name</label>
          </div>
          <div className='row'>
            <div className='input-field col m6 offset-3'>
              <input data-id-type='password' type='password' className='validate'
                onChange={this.props.handleChange} />
              <label htmlFor='password'>Password</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col m8 offset-3'>
              <button className='btn waves-effect waves-light right' type='submit' onClick={this.props.handleSignInSubmit} name='action'>Submit
                <i className='material-icons right' />
              </button>
            </div>
          </div>
        </form>
      </Modal>
    )
  }
}

export default SignInModal
