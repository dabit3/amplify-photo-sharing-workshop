import React from 'react'
import { css } from 'emotion';
import { Link } from 'react-router-dom';

export default function Posts({
  posts = []
}) {
  return (
    <>
      <h1>All Posts</h1>
      {
        posts.map(post => (
          <Link to={`/post/${post.id}`} className={linkStyle}>
            <div key={post.id} className={postContainer}>
              <h1 className={postTitleStyle}>{post.name}</h1>
              <p className={postDescriptionStyle}>{post.description}</p>
            </div>
          </Link>
        ))
      }
    </>
  )
}

const postTitleStyle = css`
  margin: 15px 0px;
  color: #0070f3;
`

const linkStyle = css`
  text-decoration: none;
`

const postContainer = css`
  border-radius: 10px;
  padding: 1px 20px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  :hover {
    border-color: #0070f3;
  }
`

const postDescriptionStyle = css`
  color: black;
`