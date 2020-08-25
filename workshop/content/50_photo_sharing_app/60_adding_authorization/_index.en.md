+++
title = "Adding Authorization to the GraphQL API"
date = 2020-07-27T20:44:03+08:00
weight = 56
+++

You can update the AppSync API to enable multiple authorization modes.

In this example, we will update the API to use the both Cognito and API Key to enable a combination of public and private access. This will also enable us to implement authorization for the API.

To enable multiple authorization modes, reconfigure the API:

```markdown
$ amplify update api

? Please select from one of the below mentioned services: GraphQL
? Choose the default authorization type for the API: API key
? Enter a description for the API key: public
? After how many days from now the API key should expire (1-365): 365 <or_your_preferred_expiration>
? Do you want to configure advanced settings for the GraphQL API: Yes, I want to make some additional changes.
? Configure additional auth types? Y
? Choose the additional authorization types you want to configure for the API: Amazon Cognito User Pool
Cognito UserPool configuration
Use a Cognito user pool configured as a part of this project.
? Configure conflict detection? No
```

Now, update the GraphQL schema to the following:

__amplify/backend/api/postagram/schema.graphql__

```graphql
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
}
```

Deploy the changes:

```markdown
$ amplify push -y
```

Now, you will have two types of API access:

1. Private (Cognito) - to create a post, a user must be signed in. Once they have created a post, they can update and delete their own post. They can also read all posts.
2. Public (API key) - Any user, regardless if they are signed in, can query for posts or a single post.

Using this combination, you can easily query for just a single user's posts or for all posts.

To make this secondary private API call from the client, the authorization type needs to be specified in the query or mutation:

```typescript
const postData = await API.graphql({
  mutation: createPost,
  authMode: 'AMAZON_COGNITO_USER_POOLS',
  variables: {
    input: postInfo
  }
});
```

### Adding a new route to view only your own posts

Next we will update the app to create a new route for viewing only the posts that we've created.

To do so, first open __CreatePost.js__ and update the `save` mutation with the following to specify the `authmode` and set the owner of the post in the local state:

```typescript
async function save() {
  try {
    const { name, description, location, image } = formState;
    if (!name || !description || !location || !image.name) return;
    updateFormState(currentState => ({ ...currentState, saving: true }));
    const postId = uuid();
    const postInfo = { name, description, location, image: formState.image.name, id: postId };

    await Storage.put(formState.image.name, formState.image.fileInfo);
    await API.graphql({
      query: createPost,
      variables: { input: postInfo },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    }); // updated
    const { username } = await Auth.currentAuthenticatedUser(); // new
    updatePosts([...posts, { ...postInfo, image: formState.file, owner: username }]); // updated
    updateFormState(currentState => ({ ...currentState, saving: false }));
    updateOverlayVisibility(false);
  } catch (err) {
    console.log('error: ', err);
  }
}
```

Next, open __App.js__.

Create a new piece of state to hold your own posts named `myPosts`:

```typescript
const [myPosts, updateMyPosts] = useState([]);
```

Next, in the `setPostState` method, update `myPosts` with posts from the signed in user:

```typescript
async function setPostState(postsArray) {
  const user = await Auth.currentAuthenticatedUser();
  const myPostData = postsArray.filter(p => p.owner === user.username);
  updateMyPosts(myPostData);
  updatePosts(postsArray);
}
```

Now, add a new route to show your posts:

```typescript
<Route exact path="/myposts" >
  <Posts posts={myPosts} />
</Route>
```

Finally, open __Header.js__ and add a link to the new route:

```typescript
<Link to="/myposts" className={linkStyle}>My Posts</Link>
```

Next, test it out:

```markdown
$ npm start
```