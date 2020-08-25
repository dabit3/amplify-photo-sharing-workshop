+++
title = "Relationships"
date = 2020-07-27T20:55:53+08:00
weight = 60
+++

What if we wanted to create a relationship between the Post and another type.

In this example, we add a new `Comment` type and create a relationship using the `@connection` directive. Doing this will enable a one to many relationship between `Post` and `Comment` types.

Paste the code below into the __amplify/backend/api/Postagram/schema.graphql__ file: 

```graphql
# schema.graphql

type Post @model
  @auth(rules: [
    { allow: owner },
    { allow: public, operations: [read] },
    { allow: private, operations: [read] }
  ]) {
  id: ID!
  name: String!
  location: String!
  description: String!
  image: String
  owner: String
  comments: [Comment] @connection
}

type Comment @model
  @auth(rules: [
    { allow: owner },
    { allow: public, operations: [read] },
    { allow: private, operations: [read] }
  ]) {
  id: ID
  message: String
  owner: String
}
```

Now, we can create relationships between posts and comments. Let's test this out with the following operations:

```graphql
mutation createPost {
  createPost(input: {
    id: "test-id-post-1"
    name: "Post 1"
    location: "Jamaica"
    description: "Great vacation"
  }) {
    id
    name
    description
  }
}

mutation createComment {
  createComment(input: {
    postCommentsId: "test-id-post-1"
    message: "Great post!"
  }) {
    id message
  }
}

query listPosts {
  listPosts {
    items {
      id
      name
      description
      location
      comments {
        items {
          message
          owner
        }
      }
    }
  }
}
```

{{% notice tip %}}
If you'd like to read more about the `@auth` directive, check out the documentation [here](https://docs.amplify.aws/cli/graphql-transformer/directives#auth).
{{% /notice %}}