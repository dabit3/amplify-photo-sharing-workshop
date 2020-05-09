import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <h1 className={headerStyle}>Travel Guide</h1>
      <Link to="/" className={linkStyle}>All Posts</Link>
    </div>
  )
}

const headerStyle = css`
  font-size: 40px;
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
