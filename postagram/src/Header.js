import React from 'react';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className={headerContainer}>
      <h1 className={headerStyle}>Postagram</h1>
      <Link to="/" className={linkStyle}>All Posts</Link>
      <Link to="/myposts" className={linkStyle}>My Posts</Link>
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