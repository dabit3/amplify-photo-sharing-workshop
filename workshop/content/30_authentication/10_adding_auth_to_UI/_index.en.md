+++
title = "Authentication in React"
date = 2020-07-23T21:49:28+08:00
weight = 31
+++

### Using the withAuthenticator component

To add authentication in the React app, we'll go into __src/App.js__ and first import the `withAuthenticator` HOC (Higher Order Component) from `@aws-amplify/ui-react`:

```typescript
// src/App.js, import the withAuthenticator component
import { withAuthenticator } from '@aws-amplify/ui-react'
```

Next, we'll wrap our default export (the App component) with the `withAuthenticator` HOC:

```typescript
function App() {/* existing code here, no changes */}

/* src/App.js, change the default export to this: */
export default withAuthenticator(App)
```

Next test it out in the browser:

```markdown
$ npm start
```

Now we can run the app and see that an Authentication flow has been added in front of our App component. This flow gives users the ability to sign up and sign in.

Click "Sign Up" and follow the prompts to create an account.  **Be sure to use a real email address!**  Once you submit your user information, check your email for a confirmation email to complete the sign up.

Now that you have the authentication service created, you can view it any time in the console by running the following command - select __User Pool__:

```markdown
$ amplify console auth

Using service: Cognito, provided by: awscloudformation
? Which console
❯ User Pool
  Identity Pool
  Both
```

### Adding a sign out button

You can also easily add a preconfigured UI component for signing out.

```typescript
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

{{% notice tip %}}
To learn more about theming the Amplify React UI components, check out the documentation [here](https://docs.amplify.aws/ui/customization/theming/q/framework/react)
{{% /notice %}}

### Accessing User Data

We can access the user's info now that they are signed in by calling `Auth.currentAuthenticatedUser()` in `useEffect`.

```typescript
import { API, Auth } from 'aws-amplify'

useEffect(() => {
  fetchPosts();
  checkUser(); // new function call
});

async function checkUser() {
  const user = await Auth.currentAuthenticatedUser();
  console.log('user:', user);
  console.log('user attributes: ', user.attributes);
}
```