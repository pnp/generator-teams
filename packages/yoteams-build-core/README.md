# yoteams-build-core

[![npm version](https://badge.fury.io/js/yoteams-build-core.svg)](https://www.npmjs.com/package/yoteams-build-core)
[![npm](https://img.shields.io/npm/dt/yoteams-build-core.svg)](https://www.npmjs.com/package/yoteams-build-core)
[![MIT](https://img.shields.io/npm/yoteams-build-core.svg)](https://github.com/PnP/generator-teams/blob/master/LICENSE.md)

Library with Gulp task for the Microsoft Teams Apps generator [**yo teams**](https://aka.ms/yoteams)

## Documentation

TODO

### Default Gulp tasks

### Custom tasks

Custom tasks can be added to the `gulpfile.js` to support any additional build or deploy steps you need.

### Overriding tasks

Existing tasks can be overwritten in `gulpfile.js` by adding a new Gulp task with the name of the task you want to overwrite, by adding the task override at the end of the file:

``` JavaScript
// Add your custom tasks below

gulp.task("webpack", () => {
    console.log("My custom webpack task");
    return Promise.resolve();
});
```




## Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
