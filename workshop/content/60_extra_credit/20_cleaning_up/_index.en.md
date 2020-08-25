+++
title = "Cleaning Up"
date = 2020-07-27T21:07:03+08:00
weight = 62
+++

### Removing Services

If at any time, or at the end of this workshop, you would like to delete a service from your project & your account, you can do this by running the `amplify remove` command:

```markdown
$ amplify remove auth

$ amplify push
```

If you are unsure of what services you have enabled at any time, you can run the `amplify status` command:

```markdown
$ amplify status

Current Environment: dev

| Category | Resource name     | Operation | Provider plugin   |
| -------- | ----------------- | --------- | ----------------- |
| Api      | postagram         | No Change | awscloudformation |
| Auth     | postagramabcdefab | No Change | awscloudformation |
| Storage  | images            | No Change | awscloudformation |

GraphQL endpoint: https://xxxxxxxxxxxxxxxxxxxxxxxxxx.appsync-api.us-east-1.amazonaws.com/graphql
GraphQL API KEY: xxx-xxxxxxxxxxxxxxxxxxxxxxxxxx
                  
```

`amplify status` will give you the list of resources that are currently enabled in your app.

### Deleting the Amplify project and all services

If you'd like to delete the entire project and all of the resources associated with it, you can run the `delete` command:

```markdown
$ amplify delete
```