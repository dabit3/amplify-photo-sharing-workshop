+++
title = "App Setup"
date = 2020-07-27T19:37:23+08:00
weight = 50
+++

### Creating the folder structure for our app

Next, create the following files in the __src__ directory:
- Button.js
- CreatePost.js
- Header.js
- Post.js
- Posts.js

```markdown

$ touch src/Button.js src/CreatePost.js src/Header.js src/Post.js src/Posts.js
```

Next, we'll go one by one and update these files with our new code.

### Button.js

Here, we will create a button that we'll be reusing across the app:

```typescript
import React from 'react';
import { css } from 'emotion';

export default function Button({
  title, onClick, type = "action"
}) {
  return (
    <button className={buttonStyle(type)} onClick={onClick}>
      { title }
    </button>
  )
}

const buttonStyle = type => css`
  background-color: ${type === "action" ? "black" : "red"};
  height: 40px;
  width: 160px;
  font-weight: 600;
  font-size: 16px;
  color: white;
  outline: none;
  border: none;
  margin-top: 5px;
  cursor: pointer;
  :hover {
    background-color: #363636;
  }
`
```

### Header.js

Add the following code in __Header.js__

```typescript
import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className={headerContainer}>
      <h1 className={headerStyle}>Postagram</h1>
      <Link to="/" className={linkStyle}>All Posts</Link>
    </div>
  )
}

const headerContainer = css`
  padding-top: 20px;
`

const headerStyle = css`
  font-size: 40px;
  margin-top: 0px;
`

const linkStyle = css`
  color: black;
  font-weight: bold;
  text-decoration: none;
  margin-right: 10px;
  :hover {
    color: #058aff;
  }
`
```