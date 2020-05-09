import React, { useState, useEffect } from 'react';
import { css } from 'emotion';
import Button from './Button';
import { v4 as uuid } from 'uuid';
import { Storage, API } from 'aws-amplify';
import { createPost } from './graphql/mutations';

const initialState = {
  name: '',
  description: '',
  image: {},
  file: ''
};

export default function CreatePost({
  updateOverlayVisibility, updatePosts, posts
}) {
  const [formState, updateFormState] = useState(initialState)
  function onChange(e) {
    e.persist()
    const image = { fileInfo: e.target.files[0], name: `${e.target.files[0].name}_${uuid()}`}
    updateFormState(currentState => ({ ...currentState, file: URL.createObjectURL(e.target.files[0]), image }))
  }
  async function save() {
    try {
      const { name, description, image } = formState
      if (!name || !image.name || !description) return
      const postId = uuid();

      const postInfo = { name, description, image: formState.image.name, id: postId }
      updatePosts([...posts, { ...postInfo, image: formState.file }])
      updateOverlayVisibility(false)

      await Storage.put(formState.image.name, formState.image.fileInfo)
      await API.graphql({
        query: createPost, variables: { input: postInfo }
      })
      console.log('created post...')
    } catch (err) {
      console.log('error: ', err)
    }
  }
  function onChangeText(e) {
    e.persist()
    updateFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }))
  }
  return (
    <div className={containerStyle}>
      <input
        placeholder="Post name"
        name="name"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Post description"
        name="description"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input 
        type="file"
        onChange={onChange}
      />
      { formState.file && <img className={imageStyle} src={formState.file} /> }
      <Button title="Create New Post" onClick={save} />
      <Button type="cancel" title="Cancel" onClick={() => updateOverlayVisibility(false)} />
    </div>
  )
}

const inputStyle = css`
  margin-bottom: 10px;
  outline: none;
  padding: 7px;
  border: 1px solid #ddd;
  font-size: 16px;
`

const imageStyle = css`
  height: 120px;
  margin: 10px 0px;
  object-fit: contain;
`

const containerStyle = css`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 340px;
  position: fixed;
  left: 0;
  border-radius: 4px;
  top: 0;
  margin-left: calc(50vw - 200px);
  margin-top: calc(50vh - 180px);
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.125rem 0.25rem;
  padding: 20px;
`