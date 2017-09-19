import React, {Component} from 'react'
import SignupModal from './SignupModal.js'
import SignInModal from './SignInModal.js'
import $ from 'jquery'

class NavBar extends Component {
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
      url: 'http://localhost:3001/signup',
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
      url: 'http://localhost:3001/login',
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
      this.props.handleLogOut()
    })
  }

  render () {
    if (!this.props.isLoggedIn) {
      return (
        <div>
            <SignupModal isSignUpOpen={this.state.isSignUpOpen} toggleSignupModal={(e)=>this.toggleSignupModal(e)} handleSignupSubmit={(e)=>this.handleSignupSubmit(e)} handleChange={(e)=>this.handleChange(e)}
            />
            <SignInModal isSignInOpen={this.state.isSignInOpen} toggleSignInModal={(e)=>this.toggleSignInModal(e)} handleSignInSubmit={(e)=>this.handleSignInSubmit(e)} handleChange={(e)=>this.handleChange(e)}
            />
          </div>
      )
    }
    return (
      <header>
        <nav className='black'>
          <a className='brand-logo left light-primary-text'>Articulat.in</a>
          <ul id='navList' className='right'>
            <li><a className='light-primary-text'>Welcome Back!</a></li>
            <li><a onClick={this.props.handleLogOut} className='light-primary-text'>Log Out</a></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default NavBar
