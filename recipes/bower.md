# Using Bower for dependency management

[Bower](http://bower.io) is a great tool for managing third party client side dependencies. Here's how to leverage Bower on a Fabricator instance:

1. Install bower `$ npm install bower --save-dev`
2. Run `$ bower init` in your project.
3. Add a `.bowerrc` config file (see below).
4. Update `package.json` `scripts` object to hook into Bower install task.
5. Refer to the vendor script recipe for steps on including these scripts.

**.bowerrc**

```json
{
  "directory": "src/vendor"
}
```

**package.json**

```json
"scripts": {
  "gulp": "gulp",
  "bower": "bower",
  "prestart": "npm install",
  "build": "npm install && gulp",
  "postinstall": "bower install",
  "start": "gulp --dev"
},
```
