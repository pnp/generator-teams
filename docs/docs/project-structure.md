# Project Structure

The generated project from the Microsoft Teams Apps generator has the following project and file/folder structure.

## The root folder

The root folder contains all the required files you need to build and run your project.

- `gulpfile.js` contains configuration for the Gulp tasks. See [`yoteams-core-build`]() for more information
- `README-XXX.md` automatically generated readme file to help you get started
- `.env` contains replaceable strings that will be used throughout your project and make it easier for you to move projects between environments.
- `Dockerfile` a pre-configured Docker file

## The `src` folder

The source folder contains your code and is divided into the following folders:

- `client`: contains clients side TypeScript code
- `manifest`: contains the Microsoft Teams App manifest and icons
- `public`: contains static web site files
- `server`: contains server side code
- `test`: contains test setup files. *Note*: only added if tests are chosen during initial scaffolding

### The `manifest` folder

The `manifest` folder contains the manifest file (`manifest.json`) as well as the two required logos. The manifest file uses replaceable tokens.

### The `client` folder


### The `app` folder

The `app` folder contains the actual code files/folders for your application. In the root of the `app` folder are two files; `server.ts` and `TeamsAppsComponents.ts`. The `server.ts` file is the file that creates the web server [Express](https://www.npmjs.com/package/express) and loads all your components you define in your project using the [express-msteams-host](https://www.npmjs.com/package/express-msteams-host) npm package. It will load all exported classes from the `TeamsAppsComponents.ts`. 

> Note: if you manually add more tabs, bots etc, you need to export those classes in the `TeamsAppsComponents.ts` file so that the *express-msteams-host* middleware can find them.

Each component requiring a server side implementation will get its own folder under the `app` folder, with their unique names. 

The folder called `web` contains all the files required for the web application, such as html, assets and css files. Eeach component that requires a web interface will create its corresponding folder under the `web` folder. 

> Note: most components does not require any modification of the actual html files as they are pure client side React components.

The `scripts` folder contains all the client-side code, also with a folder for each component. The file called `client.ts` inside the `scripts` folder must contain exports of all client side React components so that they can be loaded in the html files.
