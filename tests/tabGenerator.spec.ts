import * as path from 'path';
import * as rimraf from 'rimraf';
import * as fs from 'fs-extra';
import * as helpers from 'yeoman-test';
import * as assert from 'yeoman-assert';
import { describe, it} from 'mocha';

describe('teams:tab', function () {
    const componentName = 'testFnComponent';

    beforeEach(() => {
      // return helpers.run(path.join(__dirname, '../generators/app'))
      //   .inDir(path.join(__dirname, '../temp-templates/tab'))
      //   .withPrompts({
      //     // Mock the prompt answers 
      //     solutionName: 'tab-test-01',
      //     whichFolder: 'current',
      //     name: 'tabtest01',
      //     developer: 'generator teams developer',
      //     manifestVersion: 'v1.3',
      //     parts: 'tab',
      //     unitTestsEnabled: true
      //   }).withGenerators([
      //       '../../generators/tab',
      //       '../../generators/bot',
      //       '../../generators/connector',
      //       '../../generators/custombot',
      //       '../../generators/messageExtension']);
    });

    afterEach(() => {
        // rimraf.sync(path.join(__dirname, '../temp-templates/tab'));
    });

    it('generates project with v1.3 with unit tests', function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(__dirname, '../temp-templates/tab'))
        .withPrompts({
          solutionName: 'tab-test-01',
          whichFolder: 'current',
          name: 'tabtest01',
          developer: 'generator teams developer',
          manifestVersion: 'v1.3',
          parts: 'tab',
          unitTestsEnabled: true
        })
        .withGenerators([
            '../../generators/tab',
            '../../generators/bot',
            '../../generators/connector',
            '../../generators/custombot',
            '../../generators/messageExtension'
        ])
        .then(function() {
          assert.file('package.json');

          rimraf.sync(path.join(__dirname, '../temp-templates/tab'));
        });
    });

    // it('generates project with devPreview', function () {
    //     // assert the file exist
    //     // assert the file uses AMD definition
    // });
});