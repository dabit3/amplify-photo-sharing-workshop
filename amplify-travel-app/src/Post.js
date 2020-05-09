import React, { useState, useEffect, useReducer } from 'react'
import { css } from 'emotion';
import Container from './Container'
import { useParams } from 'react-router-dom';
import { API, Storage } from 'aws-amplify';
import { getPost } from './graphql/queries';

export default function Post() {
  const [loading, updateLoading] = useState(true);
  const [post, updatePost] = useState(null);
  const { id } = useParams()
  useEffect(() => {
    fetchPost()
  }, [])
  async function fetchPost() {
    try {
        const postData = await API.graphql({
          query: getPost, variables: { id }
        });
        const currentPost = postData.data.getPost
        const image = await Storage.get(currentPost.image);
        currentPost.image = image;
        updatePost(currentPost);
        updateLoading(false);
    } catch (err) {
      console.log('error: ', err)
    }
  }
  if (loading) return <h3>Loading...</h3>
  console.log('post: ', post)
  return (
    <Container>
        <h1>{post.name}</h1>
        <p>{post.description}</p>
        <img src={post.image} className={imageStyle} />
    </Container>
  )
}

const imageStyle = css`
  max-width: 500px;
  @media (max-width: 500px) {
    width: 100%;
  }
`