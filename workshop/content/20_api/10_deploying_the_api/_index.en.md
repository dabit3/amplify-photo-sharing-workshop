+++
title = "Deploying the API"
date = 2020-07-23T21:34:17+08:00
weight = 21
+++

### Deploying the API

To deploy the API, run the push command:

```markdown
$ amplify push

? Are you sure you want to continue? Y

# You will be walked through the following questions for GraphQL code generation
? Do you want to generate code for your newly created GraphQL API?: Y
? Choose the code generation language target: javascript
? Enter the file name pattern of graphql queries, mutations and subscriptions: src/graphql/**/*.js
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions?: Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested]: 2
```

{{% notice tip %}}
Alternately, you can run `$ amplify push -y` to answer __Yes__ to all questions.
{{% /notice %}}

Now the API is live and you can start interacting with it!


### Testing the API

To test it out we can use the GraphiQL editor in the AppSync dashboard. To open the AppSync dashboard, run the following command:

```markdown
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