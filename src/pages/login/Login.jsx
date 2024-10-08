import { useContext, useRef } from "react";
import "./login.css"
import {loginCall} from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";

export default function Login() {

    const email = useRef();
    const password = useRef();

    const { isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            {email:email.current.value,password: password.current.value}, 
            dispatch);
    }
    // console.log(user);

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
                        <input placeholder="Email"
                            type="email" required
                            className = "loginInput"
                            ref={email} />
                        <input placeholder="Password"
                            type="password"
                            required minLength={6}
                            className="loginInput"
                            ref={password} />
                        <button className="loginButton" type="submit" disabled = {isFetching} >
                            {isFetching ? <CircularProgress color="inherit" font="18px"/> : "Log In"}
                            {/* {isFetching ? "loading" : "Log In"} */}
                        </button>
                        <span className="loginForgot">Forgot Password ?</span>
                        

                        <Link className="LinkToRegister" to="/register" style={{ textDecoration: "none" }}>
                        <button className="loginRegisterButton">
                            {isFetching ? <CircularProgress color = "inherit" size="22px"/> : "Create a New Account"}
                        </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}