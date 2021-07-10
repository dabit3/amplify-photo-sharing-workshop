import React from 'react';
import { css } from '@emotion/css';

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