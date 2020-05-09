import React, { useState, useEffect } from "react";
import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { css } from 'emotion'
import { API, Storage } from 'aws-amplify';
import { listPosts } from './graphql/queries';

import Container from './Container';
import Posts from './Posts';
import Header from './Header';
import CreatePost from './CreatePost';
import Button from './Button';

function Router() {
  const [showOverlay, updateOverlayVisibility] = useState(true);
  const [posts, updatePosts] = useState([]);
  useEffect(() => {
      fetchPosts()
  }, [])
  async function fetchPosts() {
    let postData = await API.graphql({ query: listPosts, variables: { limit: 100 }})
    let postsArray = postData.data.listPosts.items
    postsArray = await Promise.all(postsArray.map(async post => {
      const imageKey = await Storage.get(post.image)
      post.image = imageKey
      return post
    }))    
    updatePosts(postsArray)
  }
  return (
    <Container>
        <HashRouter>
          <div className={contentStyle}>
            <Header />
            <hr className={dividerStyle} />
            <Button title="New Post" onClick={() => updateOverlayVisibility(true)} />
            <Switch>
              <Route exact path="/" posts={posts} >
                <Posts />
              </Route>
              <Route path="/myposts" >
                <Posts type="myposts" posts={posts} />
              </Route>
            </Switch>
          </div>
          <div>
            <AmplifySignOut />
          </div>
        </HashRouter>
        { showOverlay && (
          <CreatePost
            updateOverlayVisibility={updateOverlayVisibility}
            updatePosts={updatePosts}
            posts={posts}
          />
        )}
    </Container>
  );
}



const dividerStyle = css`
  margin-top: 15px;
`

const contentStyle = css`
  min-height: calc(100vh - 66px);
  padding: 0px 40px;
`

// export default withAuthenticator(Router)
export default Router