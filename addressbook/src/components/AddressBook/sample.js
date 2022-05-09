import React from 'react';
import './App.css';
import logo from './assets/images/logo.png';

class App extends React.Component {
  url="https://www.bridgelabz.com/"

  constructor() {
    super() 
    this.state = {
     // title: 'Hello from Bridgelabz'
     userName: '',
     nameError: ''
    }
  }

  /**
   *  onclick Funciton
   */
  onClick = ($event) => {
    window.open(this.url,"_blank");
  }

      onNameChange = (event) => {
      const nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
      this.setState({ userName: event.target.value})
      if(nameRegex.test(event.target.value)) {
        this.setState({nameError: ''})
      } else {
        this.setState({nameError: 'Invalid'})
      }
    }
  
    render() {
      return (
        <>
          <div>
            <h1>Hello {this.state.userName} from BridgeLabz</h1>
            <img src={logo} onClick={this.onClick} 
              alt="BridgeLabz Logo goes here."/>
          </div>
          <div>
            <h1><input onChange={this.onNameChange} /> </h1>
            <h6><span className='error-output'>{this.state.nameError}</span></h6>
          </div>
        </>
      )
    }
  } 
  
  export default App;