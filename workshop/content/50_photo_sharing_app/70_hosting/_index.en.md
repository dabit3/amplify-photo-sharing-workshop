+++
title = "Hosting"
date = 2020-07-27T20:51:09+08:00
weight = 57
+++

The Amplify Console is a hosting service with continuous integration and deployment.

The first thing we need to do is [create a new GitHub repo](https://github.com/new) for this project. Once we've created the repo, we'll copy the URL for the project to the clipboard & initialize git in our local project:

```markdown
$ git init

$ git remote add origin git@github.com:username/project-name.git

$ git add .

$ git commit -m 'initial commit'

$ git push origin master
```

Next we'll visit the Amplify Console for the app we've already deployed:

```markdown
$ amplify console
```

In the __Frontend Environments__ section, under __Connect a frontend web app__ choose __GitHub__ then then click on __Connect branch__.

Next, under "Frontend environments", authorize Github as the repository service.

Next, we'll choose the new repository & branch for the project we just created & click __Next__.

In the next screen, we'll create a new role & use this role to allow the Amplify Console to deploy these resources & click __Next__.

Finally, we can click __Save and Deploy__ to deploy our application!

Now, we can push updates to Master to update our application.