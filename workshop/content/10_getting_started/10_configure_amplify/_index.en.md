+++
title = "Configure Amplify"
date = 2020-07-23T20:52:29+08:00
weight = 11
+++

### Installing the CLI

Next, we'll install the AWS Amplify CLI:

```markdown
$ npm install -g @aws-amplify/cli
```

Now we need to configure the CLI with our credentials.

{{% notice tip %}}
If you'd like to see a video walkthrough of this configuration process, click [here](https://www.youtube.com/watch?v=fWbM5DLh25U).
{{% /notice %}}

```markdown
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

```markdown
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

The Amplify CLI has initialized a new project, and you will see a new folder: __amplify__, as well as a new file called `aws-exports.js` in the __src__ directory. These files contain your project configuration.

To view the status of the amplify project at any time, you can run the Amplify `status` command:

```markdown
$ amplify status
```

To launch a new browser window and view the Amplify project in the Amplify console at any time, run the `console` command:

```markdown
$ amplify console
```