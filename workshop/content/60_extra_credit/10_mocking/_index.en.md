+++
title = "Local Mocking"
date = 2020-07-27T21:00:35+08:00
weight = 61
+++

To mock the API, database, and storage locally, you can run the `mock` command:

```markdown
$ amplify mock

Mock Storage endpoint is running at http://localhost:20005

GraphQL schema compiled successfully.

Edit your schema at /workspace/postagram/amplify/backend/api/postagram/schema.graphql or place .graphql files in a directory at /workspace/postagram/amplify/backend/api/postagram/schema

Creating table PostTable locally

Running GraphQL codegen

✔ Generated GraphQL operations successfully and saved at src/graphql

AppSync Mock endpoint is running at http://192.168.0.2:20002
```

You should see output similar to the above.  If you open the AppSync Mock endpoint URL in your browser, it will load the GraphiQL editor, where you can run queries and mutations against the mock datastore.