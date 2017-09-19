import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import BodyContainer from './components/BodyContainer'
import LandingPage from './components/LandingPage'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      currentUserId:'',
      isLoggedIn: false
    }
  }

  setGlobalUserId = (e) => {
    this.setState({currentUserId: [e], isLoggedIn: true})
  }

  handleLogOut = (e) => {
    this.setState({isLoggedIn:false})
  }

  render () {
    return (
      <div className='App'>
        <NavBar setGlobalUserId={(e)=>this.setGlobalUserId(e)} handleLogOut={(e)=>this.handleLogOut(e)} isLoggedIn={this.state.isLoggedIn}/>
        {this.state.isLoggedIn?<BodyContainer currentUserId={this.state.currentUserId}/>:<LandingPage setGlobalUserId={(e)=>this.setGlobalUserId(e)} handleLogOut={(e)=>this.handleLogOut(e)} isLoggedIn={this.state.isLoggedIn}/>}
      </div>
    )
  }
}

export default App
