import React from 'react';
import '../../styles/styles.css'

function Register(){
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
                <h2>Register</h2>
                <form action="/auth/register" method="post" id="register-form">
                    <input type="text" placeholder="First Name" name="firstName"/>
                    <input type="text" placeholder="Last Name" name="lastName"/>
                    <input type="email" placeholder="email" name="email"/>
                    <input type="text" placeholder="username" name="username"/>
                    <input type="password" placeholder="password" name="password"/>
                    <input type="submit" value="Sign Up" class="login-button"/>
                </form>
                <p>Already have an account?</p>
                <a href="/auth/login">Login</a>
            </div>
	    </div>
        </div>
    )
}


export default Register;