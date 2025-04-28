import React, { useState } from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { changeLoginStatus } from '../Redux/Slice';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { faTruckPlane } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ identifier: '', password: '' ,isAdmin : true });
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        console.log("function called");
        console.log(form);


        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/authenticate`, {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            var data = await response.json()
            console.log(data);

            if (response.status == 200) {
                dispatch(changeLoginStatus(true))
                Cookies.set('admin', data.accessToken, { expires: 1 });
                localStorage.setItem("user", JSON.stringify(response.data))
                navigate("/getUnverifiedInvetsor")
            }
            else if(response.status == 403){
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error logging in:', error.response);
        }
    };

    return (
        <div className='loginCard'>
             <ToastContainer position="top-center"/>
            <Container style={{ maxWidth: '450px' }}>
                <Card style={{
                    padding: '2rem',
                    borderRadius: '1.5rem',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(20px)'
                }}>
                    <Card.Body>
                        <h2 className="text-center mb-4" style={{ fontWeight: 700, color: "white" }}>Login</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label className='label'>Username</Form.Label>
                                <Form.Control
                                    // type="email"
                                    name="identifier"
                                    placeholder="Enter Username"
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: '0.75rem',
                                        border: '1px solid #ccc',
                                        padding: '0.75rem'
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-4">
                                <Form.Label className='label'>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: '0.75rem',
                                        border: '1px solid #ccc',
                                        padding: '0.75rem'
                                    }}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                // type="submit"
                                className="w-100"
                                onClick={handleSubmit}
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '0.75rem',
                                    fontWeight: 600,
                                    transition: 'all 0.3s ease',
                                    backgroundColor: '#4b6cb7',
                                    border: 'none'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#3a56a1'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#4b6cb7'}
                            >
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Login;
