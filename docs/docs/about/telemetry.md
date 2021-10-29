# Telemetry

The `generator-teams` package and the build packages (`yoteams-build-core` and `yoteams-deploy`) includes a telemetry feature that collectes usage data and exception information when the generator or build package tasks crashes. It's important that the `generator-teams` team understands how the generator and the build packages are uses so they can be improved. 

## Scope

`generator-teams` *is collecting* telemetry about what configuration is used when scaffolding a new project. 

The build packages *is collecting* telemetry about what tasks is being used when building or debugging a project.

Telemetry *isn't* collected from using the generated project or when the genereated project is running.

## How to opt out

Telemetry is enabled by default. To opt out of the telemetry feature set the `YOTEAMS_TELEMETRY_OPTOUT` environment variable to ´1´ or ´true´. To opt out of telemetry feature when scaffolding a project use the `-no-telemetry` flag in combination with the `yo teams` command.

## Data points

The telemetry feature doesn't collect personal data, such as usernames or email addresses. It does not scan your code and does not extract project-level data, such as name, repository, or author. The data is sent and secured securely to Microsoft servers using the Azure Monitor technology.

The following data is collected:

* Name and aruments of Gulp tasks used
* Version of `generator-teams` used
* Version of `yoteams-*` build and helper packages used
* Client type and operating system
* Location (city, province and country)
* Configuration options (excluding any values) when scaffolding a project

Protecting your privacy is important to us. If you suspect telemetry is collecting sensitive data or the data is being insecurely or inappropriately handled, file an issu in the [pnp/generator-teams](https://aka.ms/yoteams) repository.