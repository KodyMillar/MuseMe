import React from 'react';
import '../../styles/styles.css'

function Login() {

    const backendUrl = process.env.REACT_APP_BACKEND_HOST;
    const backendPort = process.env.REACT_APP_BACKEND_PORT;
    return (
        <div class="sign-in-body">
        <div class="sign-in-page">
            <div class="logo-box">
                <div class="logo-box-heading">
                    <h1>MuseMe</h1>
                    <h3>For self-learners to purchase and play music at their level</h3>
                </div>
                <img src="/images/background/sign-in-background.png" class="sign-in-image"/>
            </div>
            <div class="login-box">
                <h2>Login</h2>
                <form action={`${backendUrl}:${backendPort}/auth/login`} method="post" id="login-form">
                    <div>
                        <input type="text" placeholder="username" name="username" class="username-input"/>
                        <input type="password" placeholder="password" name="password" class="password-input"/>
                        <p>Forgot your password?</p>
                    </div>
                    <input type="submit" value="Log In" class="login-button"/>
                </form>
                <p>Don't have an account?</p>
                <a href="/auth/register">Sign up</a>
            </div>
        </div>
        </div>
    )
}

export default Login;