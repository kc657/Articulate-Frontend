import React, {Component} from 'react'
import $ from 'jquery'

class SpeechToTextBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isRecording: false,
      stream: {},
      userInput:'',
      confirmation: false
    }
  }

  startRecording = () => {
    this.setState({isRecording: true})
    let stream = null
    const recognizeMic = require('watson-speech/speech-to-text/recognize-microphone')
    $.when($.get('http://localhost:3001/api/watson/token')).done(
      (token) => {
        stream = recognizeMic({
          token: token,
          outputElement: '#speech',
          clear: true
        })
        this.setState({stream:stream})
        stream.on('error', function (err) {
          console.log(err)
        })
      }
    )
  }

  stopRecording = () => {
    this.setState({isRecording: false})
    this.state.stream.stop('error', function (err) {
      console.log(err)
    })
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      if (this.state.userInput === ''){
        this.setState({confirmation: true})
        console.log('If you are sure, press Enter again')
      } else if(this.state.userInput !== ''){
        this.props.showGrade()
      }
    }
  }

  saveUserInput = (e) => {
    this.setState({userInput: e.target.value})
  }

  render () {
    return (
      <div id='top' className='container'>
        <div className='col s12'>
          <div className='col m12 center text-center'>
            <h1>Practice Room</h1>
          </div>
          <div className='row col m12'>
            {!this.state.isRecording? <a className='waves-effect waves-light btn' onClick={this.startRecording}><i className='material-icons left'>record_voice_over</i>Record</a>: <a className='waves-effect waves-dark btn' onClick={this.stopRecording}><i className='material-icons left'>stop</i>Stop</a>} &emsp;
            <a className='waves-effect waves-light btn' onClick={this.props.clickNewAttempt}>Go Back </a>
          </div>
          <div className='row col m12'>
            <center>
              <form>
                <textarea className='materialize-textarea speech-only' id='speech' data-id-type='userInput' onChange={this.props.saveWatsonInput} placeholder='Spoken output goes here' onKeyPress={this.props.triggerWatsonSave}></textarea>
                {!this.state.confirmation? <p>Select text and press enter after completion to review scorecard...</p>:<p>Press Enter Again</p>}
              </form>
            </center>
          </div>
        </div>
        <div className='col s3 right'>
          <h1>Transcript:</h1>
          <p>{this.props.selectedProjectScript}</p>
        </div>
      </div>
    )
  }
}

export default SpeechToTextBox
