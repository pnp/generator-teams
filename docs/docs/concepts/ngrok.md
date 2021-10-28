# Using ngrok for local development and hosting

In order to make development locally a great experience it is recommended to use [ngrok](https://ngrok.io), which allows you to publish the localhost on a public DNS, so that you can consume the bot and the other resources in Microsoft Teams.

Microsoft Teams is a cloud-based product and requires that your tab content is available from the cloud using HTTPS endpoints. Teams doesn't allow local hosting. Publish your tab to a public URL or use a proxy that exposes your local port to an internet-facing URL.

To use ngrok, it is recommended to use the `gulp ngrok-serve` command, which will read your ngrok settings from the `.env` file and automatically create a correct manifest file and finally start a local development server using the ngrok settings.

## Note on ngrok and WSL2

When running a Yo Teams generated solution on WSL2 with ngrok you might experience issues like *Failed to complete tunnel connection*. Try running ngrok as a separate process pointing to your local IP instead of localhost. For more information see: https://github.com/pnp/generator-teams/issues/189