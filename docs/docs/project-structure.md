# Project Structure

The generated project from the Microsoft Teams Apps generator has the following project and file/folder structure.

## The root folder

The root folder contains all the required files you need to build and run your project.

- `gulpfile.js` contains configuration for the Gulp tasks. See [`yoteams-core-build`](https://github.com/pnp/generator-teams/tree/master/packages/yoteams-build-core) for more information
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

The `client` folder contains the client side React components. All client side components are automatically when scaffolding being added to `client.ts`.

### The `server` folder

The `server` folder contains the server side  [Express](https://www.npmjs.com/package/express) application, defined in `server.ts`. 

The `TeamsAppsComponents.ts` file is used to export all classes for automatic Express routing detection, that uses the [express-msteams-host](https://www.npmjs.com/package/express-msteams-host) npm package for the routing setup.

### The `public` folder

The folder called `public` contains all the files required for the web application, such as html, assets and css files. 