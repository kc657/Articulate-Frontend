import React, { Component } from 'react'
import $ from 'jquery'

class ProjectList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allProjects: [],
      currentUserId: this.props.currentUserId
    }
  }

  componentWillMount () {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3001/api/projects/' + this.props.currentUserId
    })
    .then((res) => {
      this.setState({allProjects: res})
    }, (err) => {
      console.log('error: ', err)
    })
  }

  componentWillReceiveProps () {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3001/api/projects/' + this.props.currentUserId
    })
    .then((res) => {
      this.setState({allProjects: res})
    }, (err) => {
      console.log('error: ', err)
    })
  }

  render () {
    let projectCards = this.state.allProjects.slice(0).reverse().map(project => {
      return (
        <a key={project._id} id='projectCard' className='collection-item click-for-project' data-project-name={project.title} data-project-id={project._id} data-project-transcript={project.transcript} onClick={this.props.handleProjectSelect}>
          <h1> { project.title } </h1>
          <ul className='collection'>
            <li className='collection-item avatar'>
              <span className='title'>Language Tone</span>
              <p>Tentative: { project.tones.languageTone_Tentative } / 100 <br /> Confident: { project.tones.languageTone_Confident } / 100 <br /> Analytical: { project.tones.languageTone_Analytical } / 100
                </p>
              <p className='secondary-content'><i className='material-icons'>library_books</i></p>
            </li>
            <li className='collection-item avatar'>
              <span className='title'>Emotional Tone</span>
              <p>Joy: { project.tones.emotionalTone_Joy } / 100 <br /> Anger: { project.tones.emotionalTone_Anger } / 100 <br /> Sadness: { project.tones.emotionalTone_Sadness} / 100 <br /> Disgust: { project.tones.emotionalTone_Disgust } / 100 <br /> Fear: { project.tones.emotionalTone_Fear } / 100
              </p>
              <p className='secondary-content'><i className='material-icons'>sentiment_neutral</i></p>
            </li>
            <li className='collection-item avatar'>
              <span className='title'>Social Tone</span>
              <p>Conscientiousness: { project.tones.socialTone_Conscientiousness } / 100 <br /> Extraversion: { project.tones.socialTone_Etraversion } / 100 <br /> Openness: { project.tones.socialTone_Openness } / 100 <br /> Agreeableness: { project.tones.socialTone_Agreeableness } / 100 <br /> Emotional Range: { project.tones.socialTone_EmotionalRange } / 100
                </p>
              <p className='secondary-content'><i className='material-icons'>weekend</i></p>
            </li>
          </ul>
        </a>
      )
    })

    return (
      <div id='projectList' className='col m12 center-align container collection'>
        <h2 className='center'> Your Projects <a className='btn-floating btn-large waves-effect waves-light black' onClick={this.props.openModal}><i className='material-icons'>add</i></a></h2>
        { projectCards }
      </div>
    )
  }
}

export default ProjectList
