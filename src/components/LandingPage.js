import React, {Component} from 'react'
import SignupModal from './SignupModal.js'
import SignInModal from './SignInModal.js'
import $ from 'jquery'

class LandingPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signUpUserName: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpPassword: '',
      userName: '',
      password: '',
      isSignInOpen: false,
      isSignUpOpen: false,
    }
  }

  handleChange = (e) => {
    let userInfo = $(e.target).closest('.validate').data('id-type');
    this.setState({[userInfo]: e.target.value})
  }

  toggleSignupModal = () => {
    this.setState({isSignUpOpen: !this.state.isSignUpOpen})
  }

  handleSignupSubmit = (e) => {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: 'https://articulat.herokuapp.com/signup',
      data: {
        first_name: this.state.signUpFirstName,
        last_name: this.state.signUpLastName,
        password: this.state.signUpPassword,
        username: this.state.signUpUserName
      }
    })
    .then((res) => {
      console.log(res)
      this.toggleSignupModal()
    },
    (err) => {
      alert('User already exists')
    })
  }

  toggleSignInModal = () => {
    this.setState({isSignInOpen: !this.state.isSignInOpen})
  }

  handleSignInSubmit = (e) => {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: 'https://articulat.herokuapp.com/login',
      data: {
        username: this.state.userName,
        password: this.state.password
      }
    })
    .then((res) => {
      this.props.setGlobalUserId(res._id)
      this.toggleSignInModal()
    },
    (err) => {
      alert('Your Credentials Are Incorrect')
      this.setState({
        userName: '',
        password: '',
      })
      this.toggleSignInModal()
      this.props.handleLogOut()
    })
  }

  render () {
    return (
      <div className='center LandingPage secondary-text-color'>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1 className='text-primary-color frontTitle'>Articulat.in</h1>
        <br />
        <h3 className='text-primary-color font-change'> Refine Your Public Speaking Skills </h3>
        <div className='center'>
          <a onClick={(e)=>this.toggleSignInModal(e)} className='waves-effect waves-light btn font-change' >Sign In</a> &emsp;
          <a onClick={(e)=>this.toggleSignupModal(e)} className='waves-effect waves-light btn font-change'>Sign Up</a>
        </div>
        <SignupModal isSignUpOpen={this.state.isSignUpOpen} toggleSignupModal={(e)=>this.toggleSignupModal(e)} handleSignupSubmit={(e)=>this.handleSignupSubmit(e)} handleChange={(e)=>this.handleChange(e)}
        />
        <SignInModal isSignInOpen={this.state.isSignInOpen} toggleSignInModal={(e)=>this.toggleSignInModal(e)} handleSignInSubmit={(e)=>this.handleSignInSubmit(e)} handleChange={(e)=>this.handleChange(e)}
        />
      </div>
    )
  }
}

export default LandingPage
