import React, { useState, useEffect } from "react";
// import axios from "axios";
import * as yup from "yup";
import schema from "./validation/LoginFormSchema.js";
import "./Login.css"

// Styled Components Start //



// Styled Components End //

function Login() {

    const [ loginInfo, setLoginInfo ] = useState({
        username: "",
        password: ""
    });

    const [ disabled, setDisabled ] = useState(false);

    const [ error, setError ] = useState({
        username: "",
        password: ""
    });

    const validateLogin = (name, value) => {
        yup
            .reach(schema, name)
            .validate(value)
            .then((res) => {
                setError({
                    ...error,
                    [name]: ""
                })
            })
            .catch((err) => {
                setError({
                    ...error,
                    [name]: err.errors[0]
                })
            })
    };

    const textFieldChange = (name, value) => {
        validateLogin(name, value)
        setLoginInfo({
            ...loginInfo,
            [name]: value
        })
    };

    const onChange = (evt) => {
        textFieldChange(evt.target.name, evt.target.value)
    };

    const onSubmit = (evt) => {
        evt.preventDefault();
        console.log("working")
        const user = {
            username: loginInfo.username,
            password: loginInfo.password
        }
        setLoginInfo({
            username: "",
            password: ""
        })
    };

    useEffect(() => {
        schema.isValid(loginInfo)
            .then((res) => {
                setDisabled(!res)
            })
    }, [loginInfo]);

    return (
        <>
            {/* Header */}        
            <header>
                <h1>Plant App</h1>
            </header>
            <h1>Welcome Back! <br/>Your Plants Miss You...</h1>
            {/* Form with Inputs */}
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <label>
                    <h3>Username: </h3>
                </label>
                <input 
                    id="username"
                    type="text"
                    name="username"
                    value={loginInfo.username}
                    placeholder="Your Username"
                    onChange={onChange}
                />
                <br/>
                <label>       
                    <h3>Password: </h3>
                </label>
                <input
                    onChange={onChange}
                    name="password"
                    value={loginInfo.password}
                    type="text"
                    password="password"
                    placeholder="Your Password"
                />
                <br/>                
                <button disabled={disabled}>Login</button>
                <br/> 

                {/* New User Button */}
                <button className="newAccountBtn" href="#">Create New Account</button>
            </form>

            {/* Error Messages */}
            <p>{error.username}</p>
            <p>{error.password}</p>

            {/* Footer */}
            <footer>
                <p>Plant App &#169; 2020</p>
            </footer>
        </>
    )
}

export default Login; 
