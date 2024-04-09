import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classes from "./Signup.module.css";

const Signup = (props) => {
    const [enterEmail, setEnterEmail] = useState('');
    const [enterPassword, setEnterPassword] = useState('');
    const [conPassword, setConPasword] = useState('');


    const submitHandler = async (event) => {
        event.preventDefault();

        if (enterPassword === conPassword) {
            try {
                const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBC6BmlDFxdqZjR6T6UVBF6dAc6pdTwUBE", {
                    method: "POST",
                    body: JSON.stringify({
                        email: enterEmail,
                        password: enterPassword,
                        returnSecureToken: true
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if (response.ok) {
                    console.log("Succesfully Sign Up!!")
                    const data = await response.json();
                    console.log(data);
                } else {
                    const data = await response.json();
                    let errMsg = "Authentication Failed!!";

                    if (data && data.error && data.error.message) {
                        errMsg = data.error.message
                    }

                    throw new Error(errMsg)
                }
            } catch (error) {
                alert(error.message);
            }
            setEnterEmail('');
            setEnterPassword('');
            setConPasword('');
            props.onShow();
        } else {
            alert("Confirm Password Not matched!!");
        }

    }

    return (
        <div className={classes.card}>
            <h3>Sign Up</h3>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={enterEmail}
                        onChange={(event) => setEnterEmail(event.target.value)} />
                    <Form.Text className="text-muted">
                        <p>We'll never share your email with anyone else.</p>
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={enterPassword}
                        onChange={(event) => setEnterPassword(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={conPassword}
                        onChange={(event) => setConPasword(event.target.value)} />
                </Form.Group>

                <div className={classes.action}>
                    <Button variant="primary" type="submit">
                        Create Account
                    </Button>
                </div>
                <div className={classes.toggle}>
                    <span>Already have an account?</span><button onClick={props.onShow}>LogIn</button>
                </div>
            </Form>
        </div>
    )
}

export default Signup