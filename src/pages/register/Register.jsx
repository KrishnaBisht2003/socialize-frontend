import "./register.css"
import {useRef} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

axios.defaults.baseURL = 'https://socialize-backend-nmng.onrender.com/api';

export default function Login() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const nav = useNavigate();

    const handleClick = async (e) =>{
        e.preventDefault();
        if(password.current.value !== passwordAgain.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!")
        } else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            // const user = {
            //     "username" : "naman",
            //     "email": "naman@gmail.com",
            //     "password": "12345678"
            //   }
            try{
                // await axios.post("/auth/register", user);
                await axios.post("/auth/register", user);
                nav("/login")
            } catch(err){
                console.log(err);
            }
            
        }
    }

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Socialize</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Socialize.
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Username" required ref = {username} className="loginInput" />
                    <input placeholder="Email" required ref={email} className="loginInput" type="email"/>
                    <input placeholder="Password" required ref={password} className="loginInput" type="password" minLength={6}/>
                    <input placeholder="Password Again" required ref={passwordAgain} className="loginInput" type="password" minLength={6}/>
                    <button className="loginButton" type="submit" >Sign Up</button>
                    <button className="loginRegisterButton">Log into Account</button>
                </form>
            </div>
        </div>
    </div>
  )
}
