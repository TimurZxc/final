import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'

const Post = ({ title, description,onClick,onDelete }) => {
    return (
        <div className="post">
            <h3>{title}</h3>
            <p>{description}</p>
            <Button variant='primary' onClick={onClick}>Update</Button>
            {' '}
            <Button style={{marginTop:"10px"}} variant ='danger' onClick={onDelete}>Delete</Button>
        </div>
    )
}

export default Post;