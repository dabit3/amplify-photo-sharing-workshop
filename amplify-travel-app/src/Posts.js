import React, { useState, useEffect, useReducer } from 'react'
import { css } from 'emotion';
import Container from './Container'
import { Link } from 'react-router-dom';

export default function Posts({
    posts = []
}) {
    
    return (
        <Container>
            <h1>All Posts</h1>
            {
                posts.map(post => (
                    <Link to={`/post/${post.id}`}>
                        <div key={post.id} className={postContainer}>
                            <h1 className={postTitleStyle}>{post.name}</h1>
                            <p>{post.description}</p>
                        </div>
                    </Link>
                ))
            }
        </Container>
    )
}

const postTitleStyle = css`
  margin-top: 10px;
`

const postContainer = css`
  border-radius: 10px;
  padding: 1px 20px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
`

const imageStyle = css`
  width: 600px;
`