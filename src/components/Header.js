import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { LoginApi, RegApi } from '../services/allApi';





function Header() {
    //login modal form
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //reg modal form
    const [regShow, setRegShow] = useState(false);

    const regHandleClose = () => setRegShow(false);
    const reghHandleShow = () => setRegShow(true);


    //login form validation
    //state to validate email input
    const [emailValid, setEmailValid] = useState(true)

    //state to validate psw input
    const [pswValid, setPswValid] = useState(true)
    //state to hold inputs
    const [loginInputs, setLoginInputs] = useState({
        email: "",
        psw: ""
    })


    const setInputs = (e) => {
        const { value, name } = e.target

        if (name == 'email') {
            if (value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {

                setEmailValid(true)
                setLoginInputs({ ...loginInputs, [name]: value })

            }
            else {
                setEmailValid(false)
            }

        }
        if (name == 'psw') {
            if (value.match(/^[a-zA-Z0-9!@#$%^&*]+$/)) {
                setPswValid(true)
                setLoginInputs({ ...loginInputs, [name]: value })
            }
            else {
                setPswValid(false)
            }

        }
    }
    //   console.log(loginInputs);
    //--------------------------------------------------------------------------

    //Register form validation
    //state to validate email input
    const [regEmailValid, setRegEmailValid] = useState(true)

    //state to validate psw input
    const [regPswValid, setRegPswValid] = useState(true)
     //state to validate cnpsw input
     const [regCnPswValid, setRegCnPswValid] = useState(true)
    //state to validate name input
    const [regNameValid, setRegNameValid] = useState(true)
    
    //state to hold inputs
    const [regInputs, setRegInputs] = useState({
        name: "",
        email: "",
        psw: "",
        cnpsw: ""

    })


    const setRegeInputs = (e) => {
        const { value, name } = e.target

        if (name == 'email') {
            if (value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {

                setRegEmailValid(true)
                setRegInputs({ ...regInputs, [name]: value })

            }
            else {
                setRegEmailValid(false)
            }

        }
        if (name == 'psw') {
            if (value.match(/^[a-zA-Z0-9!@#$%^&*]+$/)) {
                setRegPswValid(true)
                setRegInputs({ ...regInputs, [name]: value })
            }
            else {
                setRegPswValid(false)
            }
        }
            if (name == 'cnpsw') {
                if (value.match(/^[a-zA-Z0-9!@#$%^&*]+$/)) {
                    setRegCnPswValid(true)
                    setRegInputs({ ...regInputs, [name]: value })
                }
                else {
                    setRegCnPswValid(false)
                }

        }
        if (name == 'name') {
            if (value.match(/^[a-zA-Z ]+$/)) {
                setRegNameValid(true)
                setRegInputs({ ...regInputs, [name]: value })
            }
            else {
                setRegNameValid(false)
            }

        }
    }
    // console.log(regInputs);

    const navigate = useNavigate()
    //register

    const register = async () => {
        const { name, email, psw,cnpsw } = regInputs

        if (email == "" || name == "" || psw == "") {
            alert("All inputs are required")

        }
        if(psw==cnpsw){

            const result = await RegApi(regInputs)
            if(result.status >= 200 && result.status < 300){
             
                alert("Registration Success")
                navigate('/')
                regHandleClose()
            }
            else{
                alert(result.response.error)
            }
            
        }
        else {
            
            alert("Password must be same")
    }
        }
       


    //login

    const login = async () => {
        const { email, psw } = loginInputs

        if (email == "" || psw == "") {
            alert("All inputs are required")

        }
        else {
            const result = await LoginApi(loginInputs)
            if (result.status >= 200 && result.status < 300) {
                alert("Login Success")
                localStorage.setItem("name",result.data.name);
                localStorage.setItem("email",result.data.email);

                navigate('/home')
                handleClose()

            }
            else {
                alert(result.response.error)
            }
        }

    }
    const logout=()=>{
        localStorage.removeItem("name")
        localStorage.removeItem("email")

        navigate("/")
    }
    //--------------------------------------------------------------------------



    return (
        <div>

            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand className='fs-3' href="/"><b>Home</b></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                            
                       {!localStorage.getItem("name") && 
                       <div>
                           <Button  className="btn btn-warning me-2" onClick={handleShow}> Login</Button>
                            <Button className="btn btn-warning" onClick={reghHandleShow}> Register</Button>
                       </div>  
                        }

                        {localStorage.getItem("name") && <div>
                       <Button className="btn btn-warning" onClick={logout} > Logout</Button>

                       </div>}



                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* login modal */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => setInputs(e)} name="email" type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        {!emailValid && <div>
                            <p className='text-danger'>Invalid Email</p>
                        </div>}

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setInputs(e)} name="psw" type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>
                    {!pswValid && <div>
                        <p className='text-danger'>Invalid Password</p>
                    </div>}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={login}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Reg modal */}

            <Modal show={regShow} onHide={regHandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Enter Name</Form.Label>
                            <Form.Control onChange={(e) => setRegeInputs(e)} name="name" type="text" placeholder="Enter Name" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        {!regNameValid && <div>
                            <p className='text-danger'>Invalid Email</p>
                        </div>}

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter Email address</Form.Label>
                            <Form.Control onChange={(e) => setRegeInputs(e)} name="email" type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        {!regEmailValid && <div>
                            <p className='text-danger'>Invalid Email</p>
                        </div>}

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setRegeInputs(e)} name="psw" type="password" placeholder="Password" />
                        </Form.Group>
                        {!regPswValid && <div>
                            <p className='text-danger'>Invalid Email</p>
                        </div>}
                        <Form.Group className="mb-3" controlId="formBasicCnfPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control onChange={(e) => setRegeInputs(e)} name="cnpsw" type="password" placeholder="Confirm Password" />
                        </Form.Group>
                        {!regCnPswValid && <div>
                            <p className='text-danger'>Invalid Email</p>
                        </div>}
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={register}>
                        Register
                    </Button>
                </Modal.Footer>
            </Modal>



        </div>
    )
}


export default Header