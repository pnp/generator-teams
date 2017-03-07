# <%= title %>

<%= description %>

TODO: Add your documentation here

## Getting started with Tab development

Head on over to [official documentation](https://msdn.microsoft.com/en-us/microsoft-teams/tabs) to learn how to build Microsoft Teams Tabs.

## Building the tab

```
npm i -g gulp
gulp build
```

## Building the manifest

```
gulp manifest
```

## Output

* dist/* - the files required to host the solution
* package/* - the Teams Tab package (zip file) to be uploaded to Microsoft Teams

## Express hosting

If you choose to use [Express](http://expressjs.com/) hosting when you create your Tab project, a file called `./src/server.ts` will be created. Node is automatically configured to start this Express server when deployed to Azure.

## Deploying to Azure using Git

If you want to deploy to Azure using Git follow these steps.

This will automatically deploy your files to Azure, download the npm pacakges, build the solution and start the web server using Express.

1. Log into [the Azure Portal](https://portal.azure.com)
2. Create a new *Resource Group* or use an existing one
3. Create a new *Web App* and give it the name of your tab, the same you used when asked for URL in the Yeoman generator. In your case <%= host %>.
4. Go to the created Web App and configure *Deployment Credentials*. Not that this is only done once per Microsoft Azure Account.
5. Go to *Deployment Options*
6. Choose *Local Git Repository* as source and click *OK*
7. In your tab folder initialize a Git repository using `git init`
8. Build the solution using `gulp build` to make sure you don't have any errors
9. Commit all your files using `git add -A && git commit -m "Initial commit"`
10. Run the following command to set up the remote repository: `git remote add azure https://<username>@<%=appname%>.scm.azurewebsites.net:443/<%=appname%>.git`. You need to replace <username> with the name of the user you set up in _Deployment Credentials_. You can also copy the URL from *Options* in the Azure Web App.
11. To push your code use to Azure use the following command: `git push azure master`, you will be asked for your credentials the first time
12. Wait until the deployment is completed and navigate to <%= host %>/privacy.html to test that the web application is running
13. Done
14. Repeat step 11 for every commit you do and want to deploy


