+++
title = "Image Storage with Amazon S3"
date = 2020-07-27T18:45:54+08:00
weight = 40
+++


To add image storage, we'll use Amazon S3, which can be configured and created via the Amplify CLI:

```markdown
$ amplify add storage

? Please select from one of the below mentioned services: Content
? Please provide a friendly name for your resource that will be used to label this category in the project: images
? Please provide bucket name: postagramxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx <use_the_default>
? Who should have access: Auth and guest users
? What kind of access do you want for Authenticated users? create, update, read, delete
? What kind of access do you want for Guest users? read
? Do you want to add a Lambda Trigger for your S3 Bucket? N
```

To deploy the service, run the following command:

```markdown
$ amplify push
```

To save items to S3, we use the `Storage` API. The `Storage` API works like this.

#### Saving an item

```typescript
const file = e.target.files[0];
await Storage.put(file.name, file);
```

#### Retrieving an item

```typescript
const image = await Storage.get('my-image-key.jpg')
```

Now we can start saving images to S3 and we can continue building the Photo Sharing Travel app.