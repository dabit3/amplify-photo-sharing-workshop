+++
title = "Adding a GraphQL API"
date = 2020-07-23T21:30:53+08:00
weight = 20
+++

To add a GraphQL API, we can use the following command:

```markdown
$ amplify add api

? Please select from one of the above mentioned services: GraphQL
? Provide API name: postagram
? Choose the default authorization type for the API: API key
? Enter a description for the API key: public
? After how many days from now the API key should expire (1-365): 365 (or your preferred expiration)
? Do you want to configure advanced settings for the GraphQL API: No
? Do you have an annotated GraphQL schema? N 
? Do you want a guided schema creation? Y
? What best describes your project: Single object with fields
? Do you want to edit the schema now? (Y/n) Y
```

The CLI should open this GraphQL schema in your text editor or IDE.

__amplify/backend/api/postagram/schema.graphql__

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