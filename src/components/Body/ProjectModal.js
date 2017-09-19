import React, { Component } from 'react'
import Modal from 'react-modal'

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 1
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
}

class ProjectModal extends Component {
  onKeyPress (e) {
    if (e.which === 13) {
      e.preventDefault()
    }
  }

  render () {
    return (
      <Modal isOpen={this.props.isModalOpen} contentLabel='Example Modal' style={customStyles}>
        <a onClick={this.props.openModal} className='btn-sm waves-light right'>X</a>
        <h2 ref={subtitle => this.subtitle = subtitle} className='center'>Add New Project</h2>
        <form>
          <div className='input-field'>
            <i className='material-icons prefix'>mode_edit</i>
            <input type='text' data-id-type='newProjectTitle' className='modalState' onChange={this.props.handleChange} onKeyPress={this.onKeyPress} value={this.props.newProjectTitle} required />
            <label htmlFor='project_name'>Project Name</label>
          </div>
          <div className='input-field'>
            <i className='material-icons prefix'>mode_edit</i>
            <textarea id='textarea1' className='materialize-textarea modalState' spellCheck='true' data-id-type='newProjectTranscript' type='text' onChange={this.props.handleChange} value={this.props.newProjectTranscript} />
            <label htmlFor='icon_prefix2'>Input Transcript</label>
          </div>
          <div className='input-field col m8 offset-3'>
            <button className='btn waves-effect waves-light right' type='submit' onClick={this.props.onProjectSubmit} name='action'>Submit
              <i className='material-icons right' />
            </button>
          </div>
        </form>
      </Modal>
    )
  }
}

export default ProjectModal
