# Development with Github Codespaces

The Yo Teams Gulp tasks will automatically detect if you're running a Yo Teams project inside a Github Codespace.

The `PUBLIC_HOSTNAME` will automatically be set as the public DNS name of your Github Codespace when running `gulp codespace-serve`. The only manual step is to make the exposed port (3007 by default) Public (default is private).
