/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($username: String!) {
    onCreatePost(username: $username) {
      id
      name
      location
      description
      image
      username
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($username: String!) {
    onUpdatePost(username: $username) {
      id
      name
      location
      description
      image
      username
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($username: String!) {
    onDeletePost(username: $username) {
      id
      name
      location
      description
      image
      username
    }
  }
`;
