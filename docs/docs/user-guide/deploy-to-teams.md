# Deployment to Teams App Store

> **NOTE**: requires `generator-teams` 3.2.0 or later

In order to streamline the development cycle Yo Teams 3.2.0 and later includes a plugin to make deployment to Teams App store easier. The `yoteams-deploy` package is a plugin for the Yo Teams Gulp tasks that adds a new flag to the `serve` and `*-serve` tasks, called `--publish`. 

When this flag is used the Gulp task will after building the manifest automatically upload the package to the Microsoft Teams App Store. You will the first time this is used be asked to sign in to the tenant of your choice.