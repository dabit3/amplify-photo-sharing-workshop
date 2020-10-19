# Build a Photo Sharing App with React and AWS Amplify

In this workshop we'll learn how to build a full stack cloud application with React, GraphQL, & [Amplify](https://docs.amplify.aws/).

![Build a Photo Sharing App with React and AWS Amplify](banner.jpg)

### Overview

We'll start from scratch, using the [Create React App CLI](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) to create a new React web project. We'll then, step by step, use the [Amplify CLI](https://github.com/aws-amplify/amplify-cli) to build out and configure our cloud infrastructure and then use the [Amplify JS Libraries](https://github.com/aws-amplify/amplify-js) to connect the React client application to the APIs we create using the CLI.

The app will be a basic CRUD + List app with real-time updates. When you think of many types of applications like Instagram, Twitter, or Facebook, they consist of a list of items and often the ability to drill down into a single item view. The app we will be building will be very similar to this, displaying a list of posts with images and data like the name, location, and description of the post. You will also be able to see only a view containing only a list of your own posts.

This workshop should take you anywhere between 2 to 5 hours to complete.

### Environment

Before we begin, make sure you have the following installed:

- Node.js v10.x or later
- npm v5.x or later
- git v2.14.1 or later

We will be working from a terminal using a [Bash shell](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) to run Amplify CLI commands to provision infrastructure and also to run a local version of the React web app and test it in a web browser.

### Background needed / level

This workshop is intended for intermediate to advanced front end & back end developers wanting to learn more about full stack serverless development.

While some level of React and GraphQL is helpful, this workshop requires zero previous knowledge about React or GraphQL.

### Topics we'll be covering:

- GraphQL API with AWS AppSync
- Authentication
- Object (image) storage
- Authorization
- Hosting
- Deleting the resources

## Getting Started - Creating the React Application

To get started, we first need to create a new React project using the [Create React App CLI](https://github.com/facebook/create-react-app).

```bash
$ npx create-react-app postagram
```

Now change into the new app directory & install AWS Amplify, AWS Amplify UI React, react-router-dom, emotion, & uuid:

```bash
$ cd postagram
$ npm install aws-amplify emotion uuid react-router-dom @aws-amplify/ui-react
```

## Installing the CLI & Initializing a new AWS Amplify Project

### Installing the CLI

Next, we'll install the AWS Amplify CLI:

```bash
$ npm install -g @aws-amplify/cli
```

Now we need to configure the CLI with our credentials.

> If you'd like to see a video walkthrough of this configuration process, click [here](https://www.youtube.com/watch?v=fWbM5DLh25U).

```sh
$ amplify configure

- Specify the AWS Region: us-east-1 || us-west-2 || eu-central-1
- Specify the username of the new IAM user: amplify-cli-user
> In the AWS Console, click Next: Permissions, Next: Tags, Next: Review, & Create User to create the new IAM user. Then return to the command line & press Enter.
- Enter the access key of the newly created user:   
? accessKeyId: (<YOUR_ACCESS_KEY_ID>)  
? secretAccessKey: (<YOUR_SECRET_ACCESS_KEY>)
- Profile Name: amplify-cli-user
```

### Initializing A New Project

```bash
$ amplify init

- Enter a name for the project: postagram
- Enter a name for the environment: dev
- Choose your default editor: Visual Studio Code (or your default editor)
- Please choose the type of app that youre building: javascript
- What javascript framework are you using: react
- Source Directory Path: src
- Distribution Directory Path: build
- Build Command: npm run-script build
- Start Command: npm run-script start
- Do you want to use an AWS profile? Y
- Please choose the profile you want to use: amplify-cli-user
```

The Amplify CLI has initialized a new project & you will see a new folder: __amplify__ & a new file called `aws-exports.js` in the __src__ directory. These files hold your project configuration.

To view the status of the amplify project at any time, you can run the Amplify `status` command:

```sh
$ amplify status
```

To view the amplify project in the Amplify console at any time, run the `console` command:

```sh
$ amplify console
```

## Adding an AWS AppSync GraphQL API

To add a GraphQL API, we can use the following command:

```sh
$ amplify add api

? Please select from one of the above mentioned services: GraphQL
? Provide API name: Postagram
? Choose the default authorization type for the API: API key
? Enter a description for the API key: public
? After how many days from now the API key should expire (1-365): 365 (or your preferred expiration)
? Do you want to configure advanced settings for the GraphQL API: No
? Do you have an annotated GraphQL schema? N 
? Choose a schema template: Single object with fields
? Do you want to edit the schema now? (Y/n) Y
```

The CLI should open this GraphQL schema in your text editor.

__amplify/backend/api/Postagram/schema.graphql__

Update the schema to the following:   

```graphql
type Post @model {
  id: ID!
  name: String!
  location: String!
  description: String!
  image: String
}
```

After saving the schema, go back to the CLI and press enter.

### Deploying the API

To deploy the API, run the push command:

```
$ amplify push

? Are you sure you want to continue? Y

# You will be walked through the following questions for GraphQL code generation
? Do you want to generate code for your newly created GraphQL API? Y
? Choose the code generation language target: javascript
? Enter the file name pattern of graphql queries, mutations and subscriptions: src/graphql/**/*.js
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions? Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested]: 2
```

> Alternately, you can run `amplify push -y` to answer __Yes__ to all questions.

Now the API is live and you can start interacting with it!


### Testing the API

To test it out we can use the GraphiQL editor in the AppSync dashboard. To open the AppSync dashboard, run the following command:

```sh
$ amplify console api

> Choose GraphQL
```

In the AppSync dashboard, click on __Queries__ to open the GraphiQL editor. In the editor, create a new post with the following mutation:

```graphql
mutation createPost {
  createPost(input: {
    name: "My first post"
    location: "New York"
    description: "Best burgers in NYC - Jackson Hole"
  }) {
    id
    name
    location
    description
  }
}
```

Then, query for the posts:

```graphql
query listPosts {
  listPosts {
    items {
      id
      name
      location
      description
    }
  }
}
```

### Configuring the React applicaion

Now, our API is created & we can test it out in our app!

The first thing we need to do is to configure our React application to be aware of our Amplify project. We can do this by referencing the auto-generated `aws-exports.js` file that is now in our src folder.

To configure the app, open __src/index.js__ and add the following code below the last import:

```js
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)
```

Now, our app is ready to start using our AWS services.

### Interacting with the GraphQL API from our client application - Querying for data

Now that the GraphQL API is running we can begin interacting with it. The first thing we'll do is perform a query to fetch data from our API.

To do so, we need to define the query, execute the query, store the data in our state, then list the items in our UI.

The main thing to notice in this component is the API call. Take a look at this piece of code:

```js
/* Call API.graphql, passing in the query that we'd like to execute. */
const postData = await API.graphql({ query: listPosts });
```

#### src/App.js

```js
// src/App.js
import React, { useState, useEffect } from 'react';

// import API from Amplify library
import { API } from 'aws-amplify'

// import query definition
import { listPosts } from './graphql/queries'

export default function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query: listPosts });
      setPosts(postData.data.listPosts.items)
    } catch (err) {
      console.log({ err })
    }
  }
  return (
    <div>
      <h1>Hello World</h1>
      {
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.name}</h3>
            <p>{post.location}</p>
          </div>
        ))
      }
    </div>
  )
}
```

In the above code we are using `API.graphql` to call the GraphQL API, and then taking the result from that API call and storing the data in our state. This should be the list of posts you created via the GraphiQL editor.

Next, test the app:

```sh
$ npm start
```

## Adding Authentication

Next, let's update the app to add authentication.

To add the authentication service, we can use the following command:

```sh
$ amplify add auth

? Do you want to use default authentication and security configuration? Default configuration 
? How do you want users to be able to sign in when using your Cognito User Pool? Username
? Do you want to configure advanced settings? No, I am done.   
```

To deploy the authentication service, you can run the `push` command:

```sh
$ amplify push

? Are you sure you want to continue? Yes
```

### Using the withAuthenticator component

To add authentication in the React app, we'll go into __src/App.js__ and first import the `withAuthenticator` HOC (Higher Order Component) from `@aws-amplify/ui-react`:

```js
// src/App.js, import the withAuthenticator component
import { withAuthenticator } from '@aws-amplify/ui-react'
```

Next, we'll wrap our default export (the App component) with the `withAuthenticator` HOC:

```js
function App() {/* existing code here, no changes */}

/* src/App.js, change the default export to this: */
export default withAuthenticator(App)
```

Next test it out in the browser:

```sh
npm start
```

Now, we can run the app and see that an Authentication flow has been added in front of our App component. This flow gives users the ability to sign up & sign in.

Once you sign up, check your email to confirm the sign up.

Now that you have the authentication service created, you can view it any time in the console by running the following command:

```sh
$ amplify console auth

> Choose User Pool
```

### Adding a sign out button

You can also easily add a preconfigured UI component for signing out.

```js
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

/* Somewhere in the UI */
<AmplifySignOut />
```

### Styling the UI components

Next, let's update the UI component styling by setting styles for the `:root` pseudoclass.

To do so, open __src/index.css__ and add the following styling:

```css
:root {
  --amplify-primary-color: #006eff;
  --amplify-primary-tint: #005ed9;
  --amplify-primary-shade: #005ed9;
}
```

> To learn more about theming the Amplify React UI components, check out the documentation [here](https://docs.amplify.aws/ui/customization/theming/q/framework/react)

### Accessing User Data

We can access the user's info now that they are signed in by calling `Auth.currentAuthenticatedUser()` in `useEffect`.

```js
import { API, Auth } from 'aws-amplify'

useEffect(() => {
  fetchPosts();
  checkUser(); // new function call
});

async function checkUser() {
  const user = await Auth.currentAuthenticatedUser();
  console.log('user: ', user);
  console.log('user attributes: ', user.attributes);
}
```

## Image Storage with Amazon S3

The last feature we need to have is image storage. To add image storage, we'll use Amazon S3. Amazon S3 can be configured and created via the Amplify CLI:

```sh
$ amplify add storage

? Please select from one of the below mentioned services: Content
? Please provide a friendly name for your resource that will be used to label this category in the project: images
? Please provide bucket name: postagram14148f2f4aeb4f259c847e1e27145a2 <use_default>
? Who should have access: Auth and guest users
? What kind of access do you want for Authenticated users? create, update, read, delete
? What kind of access do you want for Guest users? read
? Do you want to add a Lambda Trigger for your S3 Bucket? N
```

To deploy the service, run the following command:

```sh
$ amplify push
```

To save items to S3, we use the `Storage` API. The `Storage` API works like this.

1. Saving an item:

```js
const file = e.target.files[0];
await Storage.put(file.name, file);
```

2. Getting an item:

```js
const image = await Storage.get('my-image-key.jpg')
```

When fetching an item using the Storage category, Amplify will automatically retrieve the item with a [pre-signed url](https://docs.aws.amazon.com/AmazonS3/latest/dev/ShareObjectPreSignedURL.html) allowing the user to view the item.

### Creating a basic photo album

Let's update our code to implement a photo picker and photo album.

When the app loads, we will make an API call to S3 to list the images in the bucket and render them to the screen.

When a user uploads a new image, we'll also refresh the list of images along with the new image.

```js
// src/App.js
import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { v4 as uuid } from 'uuid'

function App() {
  const [images, setImages] = useState([])
  useEffect(() => {
    fetchImages()
  }, [])
  async function fetchImages() {
    // Fetch list of images from S3
    let s3images = await Storage.list('')
    // Get presigned URL for S3 images to display images in app
    s3images = await Promise.all(s3images.map(async image => {
      const signedImage = await Storage.get(image.key)
      return signedImage
    }))
    setImages(s3images)
  }
  function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    // upload the image then fetch and rerender images
    Storage.put(uuid(), file).then (() => fetchImages())
  }

  return (
    <div>
      <h1>Photo Album</h1>
      <span>Add new image</span>
      <input
        type="file"
        accept='image/png'
        onChange={onChange}
      />
      <div style={{display: 'flex', flexDirection: 'column'}}>
      { images.map(image => <img src={image} style={{width: 400, marginBottom: 10}} />) }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
```

Now we can start saving images to S3 and we can also download and view them using the Storage category from AWS Amplify.

To view the images as well as your S3 bucket at any time, do the following:

1. Run `amplify console` from your terminal
2. Click on the __File Storage__ tab
3. Click on __View in S3__ in the top right corner
4. Click on the __public__ bucket

Next, we'll continue by building the Photo Sharing App Travel app.

# Photo Sharing App Travel App

Now that we have the services we need, let's continue by building out the front end of the app.

### Creating the folder structure for our app

Next, create the following files in the __src__ directory:

```sh
Button.js
CreatePost.js
Header.js
Post.js
Posts.js
```

Next, we'll go one by one and update these files with our new code.

### Button.js

Here, we will create a button that we'll be reusing across the app:

```js
import React from 'react';
import { css } from 'emotion';

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
```

### Header.js

Add the following code in __Header.js__

```js
import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className={headerContainer}>
      <h1 className={headerStyle}>Postagram</h1>
      <Link to="/" className={linkStyle}>All Posts</Link>
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
```

## Posts.js

The next thing we'll do is create the __Posts__ component to render a list of posts.

This will go in the main view of the app. The only data from the post that will be rendered in this view is the post name and post image.

The `posts` array will be passed in as a prop to the __Posts__ component.

```js
import React from 'react'
import { css } from 'emotion';
import { Link } from 'react-router-dom';

export default function Posts({
  posts = []
}) {
  return (
    <>
      <h1>Posts</h1>
      {
        posts.map(post => (
          <Link to={`/post/${post.id}`} className={linkStyle} key={post.id}>
            <div key={post.id} className={postContainer}>
              <h1 className={postTitleStyle}>{post.name}</h1>
              <img alt="post" className={imageStyle} src={post.image} />
            </div>
          </Link>
        ))
      }
    </>
  )
}

const postTitleStyle = css`
  margin: 15px 0px;
  color: #0070f3;
`

const linkStyle = css`
  text-decoration: none;
`

const postContainer = css`
  border-radius: 10px;
  padding: 1px 20px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  :hover {
    border-color: #0070f3;
  }
`

const imageStyle = css`
  width: 100%;
  max-width: 400px;
`
```

## CreatePost.js

The next component we'll create is `CreatePost`. This component is a form that will be displayed to the user as an `overlay` or a `modal`. In it, the user will be able to toggle the overlay to show and hide it, and also be able to create a new post.

The props this component will receive are the following:

1. `updateOverlayVisibility` - This function will toggle the overlay to show / hide it
2. `updatePosts` - This function will allow us to update the main posts array
3. `posts` - The posts coming back from our API

This component has a lot going on, so before we dive into the code let's walk through what is happening:

1. We create some initial state using the `useState` hook. This state is created using the `initialState` object.
2. The `onChangeText` handler sets the name, description, and location fields of the post
3. The `onChangeImage` handler allows the user to upload an image and saves it to state. It also creates a unique image name.
4. The `save` function does the following:
- First checks to make sure that all of the form fields are populated
- Next it updates the `saving` state to true to show a saving indicator 
- We then create a unique ID for the post using the `uuid` library
- Using the form state and the `uuid`, we create a post object that will be sent to the API.
- Next, we upload the image to S3 using `Storage.put`, passing in the image name and the file
- Once the image upload is successful, we create the `post` in our GraphQL API
- Finally, we update the local state, close the popup, and update the local `posts` array with the new post

```js
import React, { useState } from 'react';
import { css } from 'emotion';
import Button from './Button';
import { v4 as uuid } from 'uuid';
import { Storage, API, Auth } from 'aws-amplify';
import { createPost } from './graphql/mutations';

/* Initial state to hold form input, saving state */
const initialState = {
  name: '',
  description: '',
  image: {},
  file: '',
  location: '',
  saving: false
};

export default function CreatePost({
  updateOverlayVisibility, updatePosts, posts
}) {
  /* 1. Create local state with useState hook */
  const [formState, updateFormState] = useState(initialState)

  /* 2. onChangeText handler updates the form state when a user types into a form field */
  function onChangeText(e) {
    e.persist();
    updateFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }));
  }

  /* 3. onChangeFile handler will be fired when a user uploads a file  */
  function onChangeFile(e) {
    e.persist();
    if (! e.target.files[0]) return;
    const image = { fileInfo: e.target.files[0], name: `${e.target.files[0].name}_${uuid()}`}
    updateFormState(currentState => ({ ...currentState, file: URL.createObjectURL(e.target.files[0]), image }))
  }

  /* 4. Save the post  */
  async function save() {
    try {
      const { name, description, location, image } = formState;
      if (!name || !description || !location || !image.name) return;
      updateFormState(currentState => ({ ...currentState, saving: true }));
      const postId = uuid();
      const postInfo = { name, description, location, image: formState.image.name, id: postId };

      await Storage.put(formState.image.name, formState.image.fileInfo);
      await API.graphql({
        query: createPost, variables: { input: postInfo }
      });
      updatePosts([...posts, { ...postInfo, image: formState.file }]);
      updateFormState(currentState => ({ ...currentState, saving: false }));
      updateOverlayVisibility(false);
    } catch (err) {
      console.log('error: ', err);
    }
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
        placeholder="Location"
        name="location"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Description"
        name="description"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input 
        type="file"
        onChange={onChangeFile}
      />
      { formState.file && <img className={imageStyle} alt="preview" src={formState.file} /> }
      <Button title="Create New Post" onClick={save} />
      <Button type="cancel" title="Cancel" onClick={() => updateOverlayVisibility(false)} />
      { formState.saving && <p className={savingMessageStyle}>Saving post...</p> }
    </div>
  )
}

const inputStyle = css`
  margin-bottom: 10px;
  outline: none;
  padding: 7px;
  border: 1px solid #ddd;
  font-size: 16px;
  border-radius: 4px;
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
  height: 420px;
  position: fixed;
  left: 0;
  border-radius: 4px;
  top: 0;
  margin-left: calc(50vw - 220px);
  margin-top: calc(50vh - 230px);
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.125rem 0.25rem;
  padding: 20px;
`

const savingMessageStyle = css`
  margin-bottom: 0px;
`
```

## Post.js

The next component that we'll build is the Post component.

In this component, we will be reading the post `id` from the router parameters. We'll then use this post `id` to make an API call to the GraphQL API to fetch the post details.

Another thing to look at is how we deal with images.

When storing an image in S3, we

```js
import React, { useState, useEffect } from 'react'
import { css } from 'emotion';
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
    <>
      <h1 className={titleStyle}>{post.name}</h1>
      <h3 className={locationStyle}>{post.location}</h3>
      <p>{post.description}</p>
      <img alt="post" src={post.image} className={imageStyle} />
    </>
  )
}

const titleStyle = css`
  margin-bottom: 7px;
`

const locationStyle = css`
  color: #0070f3;
  margin: 0;
`

const imageStyle = css`
  max-width: 500px;
  @media (max-width: 500px) {
    width: 100%;
  }
`
```

## Router - App.js

Next, create the router in App.js. Our app will have two main routes:

1. A home route - `/`. This route will render a list of posts from our API
2. A post details route - `/post/:id`. This route will render a single post and details about that post.

Using React Router, we can read the Post ID from the route and fetch the post associated with it. This is a common pattern in many apps as it makes the link shareable.

Another way to do this would be to have some global state management set up and setting the post ID in the global state. The main drawback of this approach is that the URL cannot be shared.

Other than routing, the main functionality happening in this component is an `API` call to fetch posts from our API.

```js
import React, { useState, useEffect } from "react";
import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { css } from 'emotion';
import { API, Storage, Auth } from 'aws-amplify';
import { listPosts } from './graphql/queries';

import Posts from './Posts';
import Post from './Post';
import Header from './Header';
import CreatePost from './CreatePost';
import Button from './Button';

function Router() {
  /* create a couple of pieces of initial state */
  const [showOverlay, updateOverlayVisibility] = useState(false);
  const [posts, updatePosts] = useState([]);

  /* fetch posts when component loads */
  useEffect(() => {
      fetchPosts();
  }, []);
  async function fetchPosts() {
    /* query the API, ask for 100 items */
    let postData = await API.graphql({ query: listPosts, variables: { limit: 100 }});
    let postsArray = postData.data.listPosts.items;
    /* map over the image keys in the posts array, get signed image URLs for each image */
    postsArray = await Promise.all(postsArray.map(async post => {
      const imageKey = await Storage.get(post.image);
      post.image = imageKey;
      return post;
    }));
    /* update the posts array in the local state */
    setPostState(postsArray);
  }
  async function setPostState(postsArray) {
    updatePosts(postsArray);
  }
  return (
    <>
      <HashRouter>
          <div className={contentStyle}>
            <Header />
            <hr className={dividerStyle} />
            <Button title="New Post" onClick={() => updateOverlayVisibility(true)} />
            <Switch>
              <Route exact path="/" >
                <Posts posts={posts} />
              </Route>
              <Route path="/post/:id" >
                <Post />
              </Route>
            </Switch>
          </div>
          <AmplifySignOut />
        </HashRouter>
        { showOverlay && (
          <CreatePost
            updateOverlayVisibility={updateOverlayVisibility}
            updatePosts={setPostState}
            posts={posts}
          />
        )}
    </>
  );
}

const dividerStyle = css`
  margin-top: 15px;
`

const contentStyle = css`
  min-height: calc(100vh - 45px);
  padding: 0px 40px;
`

export default withAuthenticator(Router);
```

### Deleting the existing data

Now the app is ready to test out, but before we do let's delete the existing data in the database. To do so, follow these steps:

1. Open the Amplify Console

```sh
$ amplify console
```

2. Click on __API__, then click on __PostTable__ under the __Data sources__ tab.

3. Click on the __Items__ tab.

4. Select the items in the database and delete them by choosing __Delete__ from the __Actions__ button.

### Testing the app

Now we can try everything out. To start the app, run the `start` command:

```sh
$ npm start
```

## Hosting

The Amplify Console is a hosting service with continuous integration and deployment.

The first thing we need to do is [create a new GitHub repo](https://github.com/new) for this project. Once we've created the repo, we'll copy the URL for the project to the clipboard & initialize git in our local project:

```sh
$ git init

$ git remote add origin git@github.com:username/project-name.git

$ git add .

$ git commit -m 'initial commit'

$ git push origin master
```

Next we'll visit the Amplify Console for the app we've already deployed:

```sh
$ amplify console
```

In the __Frontend Environments__ section, under __Connect a frontend web app__ choose __GitHub__ then then click on __Connect branch__.

Next, under "Frontend environments", authorize Github as the repository service.

Next, we'll choose the new repository & branch for the project we just created & click __Next__.

In the next screen, we'll create a new role & use this role to allow the Amplify Console to deploy these resources & click __Next__.

Finally, we can click __Save and Deploy__ to deploy our application!

Now, we can push updates to Master to update our application.

## Adding Authorization to the GraphQL API

You can update the AppSync API to enable multiple authorization modes.

In this example, we will update the API to use the both Cognito and API Key to enable a combination of public and private access. This will also enable us to implement authorization for the API.

To enable multiple authorization modes, reconfigure the API:

```sh
$ amplify update api

? Please select from one of the below mentioned services: GraphQL   
? Select from the options below: Update auth settings
? Choose the default authorization type for the API: API key
? Enter a description for the API key: public
? After how many days from now the API key should expire (1-365): 365 <or your preferred expiration>
? Configure additional auth types? Y
? Choose the additional authorization types you want to configure for the API: Amazon Cognito User Pool
```

Now, update the GraphQL schema to the following:

__amplify/backend/api/Postagram/schema.graphql__

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

```sh
$ amplify push -y
```

Now, you will have two types of API access:

1. Private (Cognito) - to create a post, a user must be signed in. Once they have created a post, they can update and delete their own post. They can also read all posts.
2. Public (API key) - Any user, regardless if they are signed in, can query for posts or a single post.

Using this combination, you can easily query for just a single user's posts or for all posts.

To make this secondary private API call from the client, the authorization type needs to be specified in the query or mutation:

```js
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

```js
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

```js
const [myPosts, updateMyPosts] = useState([]);
```

Next, in the `setPostState` method, update `myPosts` with posts from the signed in user:

```js
async function setPostState(postsArray) {
  const user = await Auth.currentAuthenticatedUser();
  const myPostData = postsArray.filter(p => p.owner === user.username);
  updateMyPosts(myPostData);
  updatePosts(postsArray);
}
```

Now, add a new route to show your posts:

```js
<Route exact path="/myposts" >
  <Posts posts={myPosts} />
</Route>
```

Finally, open __Header.js__ and add a link to the new route:

```js
<Link to="/myposts" className={linkStyle}>My Posts</Link>
```

Next, test it out:

```sh
$ npm start
```

## Additional learning & use cases

### Relationships

What if we wanted to create a relationship between the Post and another type.

In this example, we add a new `Comment` type and create a relationship using the `@connection` directive. Doing this will enable a one to many relationship between `Post` and `Comment` types.

```graphql
# amplify/backend/api/Postagram/schema.graphql

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

If you'd like to read more about the `@auth` directive, check out the documentation [here](https://docs.amplify.aws/cli/graphql-transformer/directives#auth).

## Local mocking

To mock the API, database, and storage locally, you can run the `mock` command:

```sh
$ amplify mock
```

## Removing Services

If at any time, or at the end of this workshop, you would like to delete a service from your project & your account, you can do this by running the `amplify remove` command:

```sh
$ amplify remove auth

$ amplify push
```

If you are unsure of what services you have enabled at any time, you can run the `amplify status` command:

```sh
$ amplify status
```

`amplify status` will give you the list of resources that are currently enabled in your app.

### Deleting the Amplify project and all services

If you'd like to delete the entire project, you can run the `delete` command:

```sh
$ amplify delete
```

<!-- ## Real-time -->

<!-- ### GraphQL Subscriptions

Next, let's see how we can create a subscription to subscribe to changes of data in our API.

To do so, we need to define the subscription, listen for the real-time data coming in from the subscription, & update the state whenever a new piece of data comes in.

```js
// import the subscription
import { onCreateTalk as OnCreateTalk } from './graphql/subscriptions'

// define the subscription in the class
subscription = {}

// subscribe in componentDidMount
componentDidMount() {
  this.subscription = API.graphql(
    graphqlOperation(OnCreateTalk)
  ).subscribe({
      next: (eventData) => {
        console.log('eventData', eventData)
        const talk = eventData.value.data.onCreateTalk
        if (talk.clientId === CLIENT_ID) return
        const talks = [ ...this.state.talks, talk ]
        this.setState({ talks })
      }
  })
}

// unsubscribe in componentWillUnmount
componentWillUnmount() {
  this.subscription.unsubscribe()
}
``` -->
