import React, { useState, useEffect, useReducer } from 'react'
import { css } from 'emotion';
import Container from './Container'

export default function Post() {
    return (
        <Container>
            <h1>Hello</h1>
        </Container>
    )
}

const imageStyle = css`
  width: 600px;
`