import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { authAction } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import classes from "./Header.module.css";

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const user = localStorage.getItem("email").split("@")[0];

    const logoutHandler = () => {
        dispatch(authAction.logOut())
        navigate("/", { replace: true })
    }

    const showWelcome = () => {
        navigate("/profile/welcome" , {replace : true})
    }

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand onClick={showWelcome} style={{cursor : 'pointer'}}>Mail Box</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">{user}</a>
                        </Navbar.Text>
                        <div className={classes.action}>
                            <Button onClick={logoutHandler}>
                                logOut
                            </Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header