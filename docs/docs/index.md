# Yo Teams - the Microsoft Teams app generator

A [Yeoman Generator](http://yeoman.io/) for [Microsoft Teams](https://teams.microsoft.com) Apps projects. **The most comprehensive and complete development toolkit for Microsoft Teams development**. Yo Teams allows you to build Microsoft Teams applications based on TypeScript and node.js on your terms, in your editor of choice, without any external or online dependencies.

 Yo Teams allows you to build Microsoft Teams applications based on TypeScript and node.js on your terms, in your editor of choice, without any external or online dependencies. Including support for extending Teams app sto other parts of the Microsoft 365 eco-system. More info at https://aka.ms/extendteamsapps.

This generator is built and maintained by the community, for the community.

## Generator support:

* Microsoft Teams Tabs
  * Including support for configuring Tabs as SharePoint Web Parts of full page applications
  * Including support for Single-Sign-On Tabs
  * Including support for full screen tabs
  * Including a dedicated scaffolding option for Microsoft Viva Connection tabs
* Microsoft Bot Framework Bots
  * Based on Bot Framework 4.9+
  * Support for calling (audio and video)
* Microsoft Teams Message extensions and actions
  * Multiple configuration options using adaptive cards, task modules, static parameters
  * Support for configuration and settings
  * Link unfurling
* Microsoft Teams and Outlook connectors
* Microsoft Teams outgoing web hooks
* Personal Tabs for Office.com, Outlook and Outlook on the web

The generated project is ready to run and deploy to Azure and includes a variety of features such as modifying the Microsoft Teams schema, support for Azure Application Insights, a pluggable framework to add additional features.

For more information about developing custom Microsoft Teams app see [the Microsoft Teams developer documentation](https://docs.microsoft.com/en-us/microsoftteams/platform/)

## Installation

The Teams generator is distributed as an NPM package. If you have the Yeoman tool and the Gulp CLI task manager installed you can install the generator globally using:

```sh
npm i -g generator-teams
```

or using yarn:

```sh
yarn global add generator-teams
```

See the [User Guide](user-guide/setup-machine.md) to learn more about the Teams generator, how to set it up and its capabilities.

## Getting started

Open up a command prompt and create a new directory where you want to create your project and in that directory type the command `yo teams`. This will start the Teams Apps generator and you will be asked a set of questions.
![yo teams](images/teams-first-app-1.png)

```sh
yo teams
```

After answering several questions you can select what items you want added to your new project. You can select a single one or any combination of items.


See the [Build your first Microsoft Teams app](tutorials/build-your-first-microsoft-teams-app.md) to learn more on how to create your first Microsoft Teams app project.

## Microsoft 365 Patterns and Practices

The Teams generator is an open-source project driven by the [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) initiative. The project is built and managed publicly on GitHub at [https://github.com/pnp/generator-teams](https://github.com/pnp/generator-teams) and accepts community contributions. We would encourage you to try it and [tell us what you think](https://github.com/pnp/generator-teams/issues). We would also love your help! We have a number of feature requests that are a [good starting point](https://github.com/pnp/generator-teams/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) to contribute to the project.

_“Sharing is caring”_

Microsoft 365 Patterns and Practices team