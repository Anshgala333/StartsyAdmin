import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router';
import "../styles/style.css"
import { useDispatch, useSelector } from 'react-redux';
import { changeLoginStatus } from '../Redux/Slice';


function Header() {

    var isLoggedIn = useSelector(state => state.admin.isLoggedIn)
    var dispatch = useDispatch()
    const navigate = useNavigate()
    function f1() {
        Cookies.remove('admin');
        navigate("/login")
        dispatch(changeLoginStatus(false))
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary header">
            <Container >
                <Navbar.Brand href="#home">Startsy</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto headerParent">
                        {isLoggedIn &&
                            <>
                                <Link className='link' to="/getUnverifiedInvetsor">Unverified Investor</Link>
                                <Link className='link' to="/ReportPost">Report</Link>
                                <Link className='link' to="/betaRating">Beta Ratings</Link>
                                <Link className='link' to="/Newsletter">Add NewsLetter</Link>
                                <Link className='link' to="/userStat">User Status</Link>
                                <div className='login'>
                                    <button onClick={f1} className="btn btn-outline-primary btn-hover-green">
                                        Logout
                                    </button>
                                </div>
                            </>
                        }

                        {!isLoggedIn &&
                            <div className='login'>
                                <Link to="/login">Login</Link>
                            </div>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;