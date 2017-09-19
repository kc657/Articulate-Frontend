import React, { Component } from 'react'
import DeleteModal from './DeleteModal'
import $ from 'jquery'

class AttemptList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allAttempts: [],
      isDeleteModalOpen: false
    }
  }

  componentWillMount () {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3001/api/attempts/' + this.props.currentUserId
    })
    .then((res) => {
      this.setState({allAttempts: res})
    }, (err) => {
      console.log('error: ', err)
    })
  }

  toggleDeleteModal = () => {
    this.setState({isDeleteModalOpen: !this.state.isDeleteModalOpen})
  }

  deletingProject = () => {
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:3001/api/projects/deleteOne/' + this.props.selectedProject
    })
    .then((res)=>{
      this.toggleDeleteModal()
      this.props.handleProjectDelete()
    })
  }

  render () {
    let attemptCards = this.state.allAttempts.slice(0).reverse().map(attempts => {
      if (attempts._project === this.props.selectedProject) {
        let date = new Date(attempts.dateCreated)
        let day = date.getDate()
        let month = date.getMonth()+1
        let hour = date.getHours()
        let minute = date.getMinutes()
        let roundTo = (n, digits) => {
          if (digits === undefined) {
            return('Did Not Detect');
          }
          var multiplicator = Math.pow(10, digits)
          n = parseFloat((n * multiplicator).toFixed(11))
          var test = (Math.round(n) / multiplicator)
          return +(test.toFixed(digits))
        }
        let averageScore = roundTo(((attempts.lcsScore + attempts.commonWordCount)/2),2)
        return (
          <div key={attempts.key}>
          <h5 className='center'>Score Card -- {averageScore}% -- Created on: {month}/{day} {hour}:{minute}</h5>
          <ul className='collection' key= {attempts.key}>
            <li className='collection-item avatar'>
              <span className='title'>Language Tone</span>
              <p>Tentative: { attempts.tones.languageTone_Tentative } / 100 <br /> Confident: { attempts.tones.languageTone_Confident } / 100 <br /> Analytical: { attempts.tones.languageTone_Analytical } / 100
                </p>
              <p className='secondary-content'><i className='material-icons'>library_books</i></p>
            </li>
            <li className='collection-item avatar'>
              <span className='title'>Emotional Tone</span>
              <p>Joy: { attempts.tones.emotionalTone_Joy } / 100 <br /> Anger: { attempts.tones.emotionalTone_Anger } / 100 <br /> Sadness: { attempts.tones.emotionalTone_Sadness} / 100 <br /> Disgust: { attempts.tones.emotionalTone_Disgust } / 100 <br /> Fear: { attempts.tones.emotionalTone_Fear } / 100
              </p>
              <p className='secondary-content'><i className='material-icons'>sentiment_neutral</i></p>
            </li>
            <li className='collection-item avatar'>
              <span className='title'>Social Tone</span>
              <p>Conscientiousness: { attempts.tones.socialTone_Conscientiousness } / 100 <br /> Extraversion: { attempts.tones.socialTone_Etraversion } / 100 <br /> Openness: { attempts.tones.socialTone_Openness } / 100 <br /> Agreeableness: { attempts.tones.socialTone_Agreeableness } / 100 <br /> Emotional Range: { attempts.tones.socialTone_EmotionalRange } / 100
                </p>
              <p className='secondary-content'><i className='material-icons'>weekend</i></p>
            </li>
          </ul>
          </div>
        )
      }
      return null
    })
    return (
      <div>
        <h1 className='center'>Project: {this.props.selectedProjectTitle}</h1>
        <div className='row center'>
          <a className='waves-effect waves-dark btn' onClick={this.props.clickNewAttempt}>Add New Recording</a> &emsp;
          <a className='waves-effect waves-dark btn' onClick={this.toggleDeleteModal}>Delete Project</a>
        </div>
        <ul className="collection">
          {attemptCards}
        </ul>
        <DeleteModal toggleDeleteModal={(e)=>this.toggleDeleteModal(e)} isDeleteModalOpen={this.state.isDeleteModalOpen} deletingProject={(e)=>this.deletingProject(e)}/>
      </div>
    )
  }
}

export default AttemptList

// <table>
//   <thead>
//     <tr>
//         <th>Tone</th>
//         <th>Category</th>
//         <th>Score /100</th>
//     </tr>
//   </thead>
//
//   <tbody>
//     <tr>
//       <td>Tentative</td>
//       <td>Language</td>
//       <td>{ attempts.tones.languageTone_Tentative } </td>
//     </tr>
//     <tr>
//       <td>Confident</td>
//       <td>Language</td>
//       <td>{ attempts.tones.languageTone_Confident } </td>
//     </tr>
//     <tr>
//       <td>Analytical</td>
//       <td>Language</td>
//       <td>{ attempts.tones.languageTone_Analytical } </td>
//     </tr>
//     <tr>
//       <td>Joy</td>
//       <td>Emotional</td>
//       <td>{ attempts.tones.emotionalTone_Joy }</td>
//     </tr>
//     <tr>
//       <td>Anger</td>
//       <td>Emotional</td>
//       <td>{ attempts.tones.emotionalTone_Anger }</td>
//     </tr>
//     <tr>
//       <td>Sadness</td>
//       <td>Emotional</td>
//       <td>{ attempts.tones.emotionalTone_Sadness}</td>
//     </tr>
//     <tr>
//       <td>Disgust</td>
//       <td>Emotional</td>
//       <td>{ attempts.tones.emotionalTone_Disgust }</td>
//     </tr>
//     <tr>
//       <td>Fear</td>
//       <td>Emotional</td>
//       <td>{ attempts.tones.emotionalTone_Fear } </td>
//     </tr>
//     <tr>
//       <td>Conscientiousness</td>
//       <td>Social</td>
//       <td>{ attempts.tones.socialTone_Conscientiousness } </td>
//     </tr>
//     <tr>
//       <td>Etraversion</td>
//       <td>Social</td>
//       <td>{ attempts.tones.socialTone_Etraversion }</td>
//     </tr>
//     <tr>
//       <td>Openness</td>
//       <td>Social</td>
//       <td>{ attempts.tones.socialTone_Openness } </td>
//     </tr>
//     <tr>
//       <td>Agreeableness</td>
//       <td>Social</td>
//       <td>{ attempts.tones.socialTone_Agreeableness } </td>
//     </tr>
//     <tr>
//       <td>Emotional Range</td>
//       <td>Social</td>
//       <td>{ attempts.tones.socialTone_EmotionalRange } </td>
//     </tr>
//   </tbody>
// </table>
