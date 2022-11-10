import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate  } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { login } from "../auth";

const LoginPage = () => {
    const { register, watch,reset, handleSubmit, formState: { errors } } = useForm()
    const history = useNavigate()
    

    const loginUser=(data)=>{
        const requestOptions = {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch('/auth/login', requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data.access_token)
                login(data.access_token)
                history('/')
            })
            .catch(err => console.log(err))
        reset()
    }

    return (
        <div className="container" style={{marginTop:"60px"}}>
            <div className="form">
                <h1>Login</h1>
                <form>
                    <Form.Group>
                        <Form.Label><strong>Username</strong> </Form.Label>
                        <Form.Control type="text" 
                        placeholder="Username" 
                        {...register('username', {required:true, maxLength:20})}
                        />
                    </Form.Group>
                    {(errors.username?.type === "required" && <span style={{ color: "red" }}> Username is required</span>)
                        || (errors.username?.type === "maxLength" && <span style={{ color: "red" }}>Username shoud be less than 20 characters</span>)}


                    <Form.Group style={{marginTop:"20px"}}>
                        <Form.Label><strong>Password</strong></Form.Label>
                        <Form.Control type="password" 
                        placeholder="Password"
                        {...register('password', {request:true, minLength:8})} 
                        />
                    </Form.Group>
                    {(errors.password?.type === "required" && <span style={{ color: "red" }}> Password is required</span>) 
                    || (errors.password?.type === "minLength" && <span style={{ color: "red" }}>Password shoud be more than 8 characters</span>)}
                    <Form.Group>
                        <small>Do not have an account? <Link to={'/signup'}>Sign up</Link> </small>
                    </Form.Group>
                    <Form.Group>
                        <Button as="sub" variant="primary" className="mt-2" onClick={handleSubmit(loginUser)}>Login</Button>
                    </Form.Group>
                    
                </form>
            </div>
        </div>
    )
}

export default LoginPage