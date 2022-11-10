import React from "react";
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'


const CreatePostPage = () => {

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm()
    const createPost=(data)=>{
        console.log(data)
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')
        console.log(token)

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization':`Bearer ${JSON.parse(token)}` 
            },
            body: JSON.stringify(data)
        }

        fetch('/recipe/recipes', requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                reset()
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="createPost container" style={{ marginTop: "60px" }}>    
            <h1>Create post</h1>
            <form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text"{...register('title', {required:true, maxLength:25})}/>
                    
                </Form.Group>
                {errors.title?.type === "required" && <span style={{ color: "red" }}> Title is required</span>}
                {errors.title?.type === "maxLength" && <span style={{ color: "red" }}> Max length shoud be less than 25 characters</span>}

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} {...register('description', {required:true, maxLength:500})}/>
                    

                </Form.Group>
                {errors.description?.type === "required" && <span style={{ color: "red" }}> Description is required</span>}
                {errors.description?.type === "maxLength" && <span style={{ color: "red" }}> Max length shoud be less than 500 characters</span>}

                <Form.Group style={{marginTop:"30px"}}>
                    <Button variant="primary" onClick={handleSubmit(createPost)}>
                        Save
                    </Button>
                </Form.Group>
            </form>
        </div>
    )
}


export default CreatePostPage