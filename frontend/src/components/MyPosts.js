import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const MyPosts = () => {

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm()
    useEffect(
        () => {
            fetch('/recipe/recipes')
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    
                })
                .catch(err => console.log(err))
        }, []
    )
    
    return (
        <div className="createPost container" style={{ marginTop: "60px" }}>    
            <h1>Create post</h1>
            
        </div>
    )
}

export default MyPosts