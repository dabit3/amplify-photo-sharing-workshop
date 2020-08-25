+++
title = "Try it Out!"
date = 2020-07-27T20:25:05+08:00
weight = 55
+++

### Deleting the existing data

Now the app is ready to test out, but before we do let's delete the existing data in the database. To do so, follow these steps:

1. Open the Amplify Console

```markdown
$ amplify console
```

2. Click on __API__, then click on __PostTable__ under the __Data sources__ tab.

3. Click on the __Items__ tab.

4. Select the items in the database and delete them by choosing __Delete__ from the __Actions__ button.

### Testing the app

Now we can try everything out. To start the app, run the `start` command:

```markdown
$ npm start
```

Your Postagram App should open in a new browser tab.  If it doesn't, you should be able to access it at the url `http://localhost:3000/#/`