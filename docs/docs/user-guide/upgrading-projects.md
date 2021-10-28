# Upgrading projects

Starting with Yo Teams version 2.11.0 upgrading from earlier versions of the generator is possible. An upgrade of a project includes the option of upgrading the core build files, which are required by certain features introduced in new versions.

Projects can be updated either automatically using the generator or manually.

> Note: See release notes for upgrade compatibility

![](../images/upgrade-project.png)

## Automatically upgrade a project

Microsoft Teams apps projects created by Yo Teams (from version 2.9) can automatically be updated by running the generator once again over the project (starting from version 2.11).

Always check release notes for individual versions for upgrades, as some does not support upgrading.

### Upgrade notes

> NOTE: See each specific [release note](./Releases) for more details.

When running the generator using `yo teams` on an existing project you will be prompted if you want to continue - select *Yes* to continue the upgrade. If the project can be updated the next question asks you if you want to update the *yo teams core files* - select *Yes* to allow the generator to update the necessary files. Before you do this you should ensure that you have your source files under source control, so that you can inspect and potentially revert any changes being done by the generator.

Once the generator is finished it will update the core files as required.

> Note: you will only be asked once for updating the core build files. Subsequent executions of the generator on the project will assume an upgrade has been done.

## Manually upgrading a project

Manually upgrading a project might be required if you have made changes to the core build files or the automatic upgrade fails.

To manually upgrade a project the best way is to create a new blank project using the latest generator. Then use a file comparison tool and compare the new project with the one you want to upgrade.
