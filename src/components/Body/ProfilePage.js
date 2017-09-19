import React, { Component } from 'react'
import ProjectList from './ProjectList'
import AttemptList from './AttemptList'

class ProfilePage extends Component {
  render () {
    return (
      <div className='ProfilePage row'>
        <div className='col s12 m6'>
          <ProjectList openModal={this.props.openModal} handleProjectSelect={this.props.handleProjectSelect} currentUserId={this.props.currentUserId} />
        </div>
        <div className='col s12 m6'>
          {(this.props.selectedProject) ? <AttemptList selectedProjectTone={this.props.selectedProjectTone} clickNewAttempt={this.props.clickNewAttempt} handleProjectDelete={this.props.handleProjectDelete} selectedProject={this.props.selectedProject} selectedProjectTitle={this.props.selectedProjectTitle} currentUserId={this.props.currentUserId} /> :
          <div className='instructions center middle'>
            <h2>Instructions</h2>
            <h5>Welcome to Articulat.in! This application scores the differential between a speech transcript with your voice input. By doing so, we hope to highlight places you can improve on for your upcoming speech. The app also uses a tone-analyzer to give you some additional fun stats regarding your transcript and recording.</h5>
            <ol>
              <li>Create a new project on the left-hand side with a transcript you would like to practice on</li>
              <li>Select 'Add New Recording' and submit your recording after you have completed it for grading</li>
              <li>Use the scoring to make any adjustments to your speech before the big event!</li>
            </ol>
            <ul>
              <li>Tips: Be sure to articulate clearly!</li>
            </ul>
          </div>}
        </div>
      </div>
    )
  }
}

export default ProfilePage
