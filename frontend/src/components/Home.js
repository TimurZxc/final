import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Post from "./Posts";
import { Modal, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const LoggedInHome = () => {
    const [show, setShow] = useState(false)
    const [posts, setPosts] = useState([])
    const { register, watch, reset, handleSubmit, setValue, formState: { errors } } = useForm()
    const [postId, setPostId] = useState(1)

    useEffect(
        () => {
            fetch('/recipe/recipes')
                .then(res => res.json())
                .then(data => {
                    setPosts(data)
                })
                .catch(err => console.log(err))
        }, []
    )

    const getAllPosts = () => {
        fetch('/recipe/recipes')
            .then(res => res.json())
            .then(data => {
                setPosts(data)
            })
            .catch(err => console.log(err))
    }
    const closeModal = () => {
        setShow(false)
    }

    const showModal = (id) => {
        setShow(true)
        setPostId(id)
        posts.map(
            (post) => {
                if (post.id == id) {
                    setValue('title', post.title)
                    setValue('description', post.description)
                }
            }
        )
    }
    let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')

    const updatePost = (data) => {

        const requestOptions = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        }
        fetch(`recipe/recipe/${postId}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                const reload = window.location.reload()
                reload()
            }
            )
            .catch(err => console.log(err))
    }

    const deletePost = (id) => {
        console.log(id)
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
        }

        fetch(`/recipe/recipe/${id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                getAllPosts()
            }
            )
            .catch(err => console.log(err))
    }

    return (
        <div className="row d-flex justify-content-center">
            <Modal
                show={show}
                size="lg"
                onHide={closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"{...register('title', { required: true, maxLength: 25 })} />

                        </Form.Group>
                        {errors.title?.type === "required" && <span style={{ color: "red" }}> Title is required</span>}
                        {errors.title?.type === "maxLength" && <span style={{ color: "red" }}> Max length shoud be less than 25 characters</span>}

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={5} {...register('description', { required: true, maxLength: 500 })} />


                        </Form.Group>
                        {errors.description?.type === "required" && <span style={{ color: "red" }}> Description is required</span>}
                        {errors.description?.type === "maxLength" && <span style={{ color: "red" }}> Max length shoud be less than 500 characters</span>}

                        <Form.Group style={{ marginTop: "30px" }}>
                            <Button variant="primary" onClick={handleSubmit(updatePost)}>
                                Save
                            </Button>
                        </Form.Group>
                    </form>
                </Modal.Body>
            </Modal>
            <h1 style={{ textAlign: "center", margin: "30px" }}>List of teachers</h1>
            {posts.map((post, index) => (<Post title={post.title} key={index} description={post.description} onClick={() => { showModal(post.id) }} onDelete={() => { deletePost(post.id) }} />))}
        </div>
    )
}

const LoggedOutHome = () => {


    return (
        <div className="home container">
            <h1 className="heading">Welcome!</h1>
            <Link to='/signup' className="btn btn-primary btn-lg">Get started</Link>
        </div>
    )
}

const HomePage = () => {

    const [logged] = useAuth()
    return (
        <div >
            {logged ? <LoggedInHome /> : <LoggedOutHome />}
        </div>
    )
}

export default HomePage