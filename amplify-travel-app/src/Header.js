import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <h1>Travel Guide</h1>
            <Link to="/" className={linkStyle}>Home</Link>
            <Link to="/myposts" className={linkStyle}>Posts</Link>
        </div>
    )
}

const linkStyle = css`
  color: black;
  font-weight: bold;
  text-decoration: none;
  margin-right: 10px;
  :hover {
    color: #058aff;
  }
`
