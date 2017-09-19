import React, { Component } from 'react'

class GradePage extends Component {
  render () {
    return (
      <div className='GradePage center'>
        <h1 className='center'> Yay, your recording has been saved and graded! Press the button below to go back to your profile page to see the score sheet. </h1>
        <a className='waves-effect waves-dark btn center' onClick={this.props.clickNewAttempt}>Save and Go Home</a>
      </div>
    )
  }
}

export default GradePage
