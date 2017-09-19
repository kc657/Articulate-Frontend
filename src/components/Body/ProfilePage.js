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
            <ol>
              <li>Create a new project on the left-hand side with a transcript you would like to practice on</li>
              <li>In the list of personal projects, click and select the project you would like to work on</li>
              <li>Select 'Add New Recording' and submit your recording after you have completed it for grading</li>
              <li>Use the scoring to make any adjustments to your speech before the big event!</li>
            </ol>
          </div>}
        </div>
      </div>
    )
  }
}

export default ProfilePage
