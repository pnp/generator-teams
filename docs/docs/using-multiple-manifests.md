# Using multiple manifest files

> **NOTE**: requires `yoteams-build-core` 1.1.0 or later
. This feature is currently in preview (`1.1.0-preview`)

Yo Teams supports having multiple manifests files. There are many scenarios where you would like to have multiple manifest files and Teams App packages generated, for instance:

* Having one application but multiple Teams Apps, such as one for users and one for admins, but still using the same hosting and solution
* Working with multiple environments and you want to build different manifests for different environments, including different icons
* Working with multiple developer environments where `validDomains` and Tab SSO App Id URI's are different.

## How to use multiple manifests with Yo Teams

By default, the scaffolded project will contain one `manifest.json`, located in `./src/manifest/`. To add additional manifest files you either create a new `.json` file and manually create the manifest, or copy the existing manifest into a new file in the same folder.

The build tasks `manifest` and `validate-manifest` will now work cross all those defined manifest.json files and validate and create a separate package for each of them. The package name will be the name of the `packageName` in the manifest and only referenced icons and localization files will be included in the package.

## Add this feature to an existing project

If you scaffolded a project using Yo Teams v 3.0.x then you might need to update the build tools to support this feature. This is done using the following command

``` bash
npm install yoteams-build-core@preview --save-dev
```

## A word of caution

When working with multiple manifests there are a couple of things to keep in mind.

If you create a new manifest from a copy of an existing one it is important that you change the `packageName` so that they are different - as that is used to create the package zip file.

If you intend to use the multiple packages in the same environment it is required that you have different `id`'s in your manifest files.
