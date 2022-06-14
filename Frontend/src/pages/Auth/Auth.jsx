import React, { useState } from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import {useDispatch, useSelector} from 'react-redux'
import { login, signUp } from '../../actions/AuthAction'
const Auth = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state)=>state.authReducer.loading)
    const [isSignUp, setIsSignUp] = useState(false);
    const [data, setData] = useState({firstname:"",lastname:"",password:"",confirmpass:"",username:""});
    const [confirmPass, setConfirmPass] = useState(true);
    const handleChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const login_link = () => {
        setIsSignUp((prev)=>!prev);
    }
    const handle_submit =(e)=>{
        e.preventDefault();
        if(isSignUp)
        {
            data.confirmpass === data.password?
            dispatch(signUp(data)):
            setConfirmPass(false);
        }
        else{
            dispatch(login(data));
        }
    }
    const resetForm =()=>{
        setConfirmPass(true);
        setData({firstname:"",lastname:"",password:"",confirmpass:"",username:""})
    }
    return (
        <div className="Auth">
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>ABC Media</h1>
                    <h6>Explore the ideas throughout the world.</h6>
                </div>
            </div>
            <div className="a-right">
                <form action="" className="infoForm authForm" onSubmit={handle_submit}>
                    <h3>{isSignUp === true ? "Sign up" : "Login"}</h3>
                    {isSignUp && <div>
                        <input type="text" className="infoInput" id="" placeholder='First Name' name='firstname' onChange={handleChange} value={data.firstname}/>
                        <input type="text" className="infoInput" id="" placeholder='Last Name' name='lastname' onChange={handleChange} value={data.lastname}/>
                    </div>}
                    <div>
                        <input type="text" name="username" placeholder='Username' className="infoInput" onChange={handleChange} value={data.username}/>
                    </div>
                    <div>
                        <input type="password" name="password" id="" className="infoInput" placeholder='Password' onChange={handleChange} value={data.password}/>
                        {isSignUp && <input type="password" name="confirmpass" id="" className="infoInput" placeholder='Confirm Password' onChange={handleChange} value={data.confirmpass}/>}
                    </div>

                   {!confirmPass && <span style={{display: confirmPass?"none":"block",color:"red",fontSize:'12px',alignSelf:"flex-end",marginRight:"5px"}}>* Confirm Password is not same!</span>}


                    {isSignUp ? <div><span style={{ fontSize: '14px' }}>Already have an Account. <span onClick={()=>{login_link();resetForm();}} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Login!</span></span></div> :
                        <div><span style={{ fontSize: '14px' }}>Don't have an Account. <span onClick={()=>{login_link();resetForm();}} style={{ cursor: 'pointer', textDecoration: 'underline' }}>SignUp!</span></span></div>
                    }
                    <button className="button infoButton" type='submit' disabled={loading}>{loading? "Loading...":isSignUp ? "SignUp" : "Login"}</button>
                </form>
            </div>
        </div>
    )
}
export default Auth;
