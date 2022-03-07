# Different packages

To keep an a seperation of concern, we opted into having 3 seperate packages that when combined create the Microsoft Teams Apps generator

## Generator-teams

This is the yeoman generator that creates the scaffolding for you. Most functionality can be found in this package.
More information can be found in the specific [readme file](https://github.com/pnp/generator-teams/tree/master/packages/generator-teams)

## Yoteams-build-core

This package consists of a set of Gulp tasks that is used by the Generator. They make sure the generator works as designed but hold no scaffolding logic. These are for example the build tasks.
More information can be found in the specific [readme file](https://github.com/pnp/generator-teams/tree/master/packages/yoteams-build-core)

## Yoteams-deploy

This package consists of a set of Gulp tasks that will help you deploy the Teams application you created to your environment. 
More information can be found in the specific [readme file](https://github.com/pnp/generator-teams/tree/master/packages/yoteams-deploy)
