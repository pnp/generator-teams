# Set up your Office 365 tenant

In order to build applications for Microsoft Teams you need to have access to an Office 365 tenant with either global administrator permissions or have a global administrator allow you to do side-loading of apps.

## Enabling Microsoft Teams Apps and sideloading

Enabling custom apps for Microsoft Teams is done via the [Microsoft Teams admin center, https://admin.teams.microsoft.com](https://admin.teams.microsoft.com). Use the navigation on the left hand side and choose *Teams apps* > *Setup policies*. To allow all users to sideload applications you should modify the *Global* policy to allow **Upload custom apps**. To only allow a subset of users to use side loading, then create a new policy with the setting and then assign that policy to the users you want to be able to sideload.
