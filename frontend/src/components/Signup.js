import React, { useState, useRef } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"

const SignupPage = () => {


    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm()
    const [ show, setShow ] = useState(false)
    const [serverResponse, setServerResponse] = useState('')

    const password = useRef({});
    password.current = watch("password", "");


    const submitFrom = (data) => {

        if (data.password === data.confirmPassword) {
            const body = {
                "username": data.username,
                "email": data.email,
                "password": data.password
            }
            const requestOptions = {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            }
            fetch('/auth/signup', requestOptions)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setServerResponse(data.message)
                    console.log(serverResponse)
                    setShow(true)
                })
                .catch(err => console.log(err))
            reset()
        } else {
            alert("di nahi")
        }
    }


    console.log(watch("username"))
    console.log(watch("email"))
    console.log(watch("password"))
    console.log(watch("confirmPassword"))
    return (
        <div className="container" style={{marginTop:"60px"}}>
            <div className="form">
                {show ?
                    <>
                        <Alert variant="success" onClose={() => setShow(false)} dismissible>
                            <p>
                                {serverResponse}
                            </p>
                        </Alert>
                    </> :
                    <h1>Sign-up </h1>

                }
                <form action="/">
                    <Form.Group>
                        <Form.Label> <strong>Username</strong> </Form.Label>
                        <Form.Control type="text"
                            placeholder="Username"
                            {...register("username", { required: true, maxLength: 20 })}
                        />
                    </Form.Group>
                    {(errors.username?.type === "required" && <span style={{ color: "red" }}> Username is required</span>)
                        || (errors.username?.type === "maxLength" && <span style={{ color: "red" }}>Username shoud be less than 20 characters</span>)}

                    <Form.Group style={{ marginTop: "20px" }}>
                        <Form.Label> <strong>Email</strong> </Form.Label>
                        <Form.Control type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: true, maxLenght: 80, pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            })}

                        />
                    </Form.Group>
                    {(errors.email?.type === "required" && <span style={{ color: "red" }}>Email is required</span>)
                        || (errors.email?.type === "maxLength" && <span style={{ color: "red" }}>Email shoud be less than 80 characters</span>)
                        || (errors.email?.type === "pattern" && <span style={{ color: "red" }}>Invalid email kak i ty</span>)}

                    <Form.Group style={{ marginTop: "20px" }}>
                        <Form.Label><strong>Password</strong></Form.Label>
                        <Form.Control type="password"
                            placeholder="Password"
                            {...register("password", { required: true, minLength: 8 })}

                        />
                    </Form.Group>
                    {(errors.password?.type === "required" && <span style={{ color: "red" }}>Password is required</span>)
                        || (errors.password?.type === "minLength" && <span style={{ color: "red" }}>Password shoud be more than 8 characters</span>)}

                    <Form.Group style={{ marginTop: "20px" }}>
                        <Form.Label><strong>Confirm Password</strong></Form.Label>
                        <Form.Control type="password"
                            placeholder="Password"
                            {...register("confirmPassword", {
                                required: true, minLenght: 8, validate: value =>
                                    value === password.current || "The passwords do not match"
                            }
                            )}

                        />
                    </Form.Group>
                    {(errors.confirmPassword?.type === "required" && <span style={{ color: "red" }}>Confirm your password!</span>) ||
                        (errors.confirmPassword?.type === "minLength" && <span style={{ color: "red" }}>Password shoud be more than 8 characters</span>)
                        || (errors.confirmPassword?.type === "validate" && <span style={{ color: "red" }}>Passwords are not equal!</span>)
                    }

                    <Form.Group >
                        <small>Already have an account? <Link to={'/login'}>Login</Link> </small>
                    </Form.Group>
                    <Form.Group>
                        <Button as="sub" variant="primary" className="mt-2" onClick={handleSubmit(submitFrom)}>Sign Up</Button>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default SignupPage