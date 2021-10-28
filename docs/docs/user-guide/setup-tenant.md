# Set up your Office 365 tenant

In order to build applications for Microsoft Teams you need to have access to an Office 365 tenant with either global administrator permissions or have a global administrator allow you to do side-loading of apps.

Your Microsoft 365 developer program membership entitles you to a special free Microsoft 365 E5 subscription with all the latest Microsoft 365 apps, Enterprise Mobility + Security, Azure AD, and more. You can use this subscription to build a developer sandbox where you can test your apps created with the Teams generator. 

[Set up your free Microsoft 365 E5 developer subscription now!](https://developer.microsoft.com/en-us/microsoft-365/dev-program)

## Enabling Microsoft Teams Apps and sideloading

To enable Teams for your tenant and for more invormation see [enabling Teams for your organization](https://docs.microsoft.com/en-us/microsoftteams/enable-features-office-365)

Enabling custom apps for Microsoft Teams is done via the [Microsoft Teams admin center, https://admin.teams.microsoft.com](https://admin.teams.microsoft.com). Use the navigation on the left hand side and choose *Teams apps* > *Setup policies*. To allow all users to sideload applications you should modify the *Global* policy to allow **Upload custom apps**. To only allow a subset of users to use side loading, then create a new policy with the setting and then assign that policy to the users you want to be able to sideload.

For a more detailed guide on this see [enable custom Teams apps and turn on custom app uploading](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading)
