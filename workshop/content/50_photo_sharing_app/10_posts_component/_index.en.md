+++
title = "Displaying Posts"
date = 2020-07-27T19:47:27+08:00
weight = 51
+++

## Posts.js

The next thing we'll do is create the __Posts__ component to render a list of posts, this will go in the main view of the app. The only data from the post that will be rendered in this view is the post name and post image.

The `posts` array will be passed in as a prop to the __Posts__ component.

Paste the code below into the __src/Posts.js__ file: 

```typescript
// Posts.js

import React from 'react'
import { css } from 'emotion';
import { Link } from 'react-router-dom';

export default function Posts({
  posts = []
}) {
  return (
    <>
      <h1>Posts</h1>
      {
        posts.map(post => (
          <Link to={`/post/${post.id}`} className={linkStyle} key={post.id}>
            <div key={post.id} className={postContainer}>
              <h1 className={postTitleStyle}>{post.name}</h1>
              <img alt="post" className={imageStyle} src={post.image} />
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

const imageStyle = css`
  width: 100%;
  max-width: 400px;
`
```

