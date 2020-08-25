+++
title = "Adding Authentication"
date = 2020-07-23T21:49:08+08:00
weight = 30
+++

Next, let's update the app to add authentication.

To add the authentication service, we can use the following command:

```markdown
$ amplify add auth

? Do you want to use default authentication and security configuration?: Default configuration 
? How do you want users to be able to sign in when using your Cognito User Pool?: Username
? Do you want to configure advanced settings?: No, I am done.   
```

To deploy the authentication service, you can run the `push` command:

```markdown
$ amplify push

? Are you sure you want to continue? Yes
```

When this step completes you will have authentication services set up in Amazon Cognito.  To see more information, you can run the `console` command:

```markdown
$ amplify console auth

Using service: Cognito, provided by: awscloudformation
? Which console
❯ User Pool
  Identity Pool
  Both
```