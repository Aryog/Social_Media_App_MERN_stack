import React from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
const Auth = () => {
  return (
    <div className="Auth">
        <div className="a-left">
            <img src={Logo} alt="" />
            <div className="Webname">
                <h1>ABC Media</h1>
                <h6>Explore the ideas throughout the world.</h6>
            </div>
        </div>
        {/* <SignUp/> */}
        <LogIn/>
    </div>
  )
}
function LogIn() {
    return (
      <div className="a-right">
        <form className="infoForm authForm">
          <h3>Log In</h3>
  
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
            />
          </div>
  
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
            />
          </div>
  
          <div>
              <span style={{ fontSize: "12px" }}>
                Don't have an account Sign up
              </span>
            <button className="button infoButton">Login</button>
          </div>
        </form>
      </div>
    );
  }
function SignUp(){
    return(
        <div className="a-right">
            <form action="" className="infoForm authForm">
                <h3>Sign Up</h3>
                <div>
                    <input type="text" className="infoInput" id="" placeholder='First Name' name='firstname' />
                    <input type="text" className="infoInput" id="" placeholder='Last Name' name='lastname' />
                </div>
                <div>
                    <input type="text" name="username" placeholder='Usernames' className="infoInput" />
                </div>
                <div>
                    <input type="password" name="password" id="" className="infoInput" placeholder='Password'/>
                    <input type="password" name="confirmpass" id="" className="infoInput" placeholder='Confirm Password'/>

                </div>
                <div><span style={{fontSize:'14px'}}>Already have an Account. Login!</span></div>
                <button className="button infoButton" type='submit'>Signup</button>
            </form>
        </div>
    )
}
export default Auth