import React, { useState, useEffect, useReducer } from 'react'
import { css } from 'emotion';
import Container from './Container'

export default function Posts({
    type = "public", posts = []
}) {
    
    const pageName = type === 'public' ? 'Posts' : 'My Posts'
    return (
        <Container>
            <h1>Hello from {pageName}</h1>
            {
                posts.map(post => (
                    <div key={post.id}>
                        <h2>{post.name}</h2>
                        <img 
                            src={post.image}
                            className={imageStyle}
                        />
                    </div>
                ))
            }
        </Container>
    )
}

const imageStyle = css`
  width: 600px;
`