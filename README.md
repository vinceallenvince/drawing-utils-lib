![Build status](https://travis-ci.org/vinceallenvince/drawing-utils-lib.svg?branch=master)

# drawing-utils-lib

A library of DOM-rendering utilities.

##Install

To include drawing-utils-lib as a component in your project, use the node module.

```
npm install drawing-utils-lib --save
```

You can also use the [standalone version](https://github.com/vinceallenvince/drawing-utils-lib/releases/latest) and reference the js file from your document.

```
<html>
  <head>
    <script src="scripts/drawing-utils-lib.min.js" type="text/javascript" charset="utf-8"></script>
  </head>
  ...
```

##Usage

The module exports a Utils namespace. In a nodejs project, you access it via:

```
var Utils = require('drawing-utils-lib');
var radians = Utils.degreesToRadians(30);
```

In the browser, the Utils namespace is a global.

```
<html>
  <head>
    <script src="scripts/drawing-utils-lib.js" type="text/javascript" charset="utf-8"></script>
  </head>
  <body>
    <script>
      var radians = Utils.degreesToRadians(30);
    </script>
  </body>
</html>
```

To learn how to use the various Utils functions, please review [the docs](http://vinceallenvince.github.io/drawing-utils-lib/doc/).

##Building this project

This project uses [Grunt](http://gruntjs.com). To build the project first install the node modules.

```
npm install
```

Next, run grunt.

```
grunt
```

To run the tests, run 'npm test'.

```
npm test
```

To check test coverage run 'grunt coverage'.

```
grunt coverage
```

A pre-commit hook is defined in /pre-commit that runs jshint. To use the hook, run the following:

```
ln -s ../../pre-commit .git/hooks/pre-commit
```

A post-commit hook is defined in /post-commit that runs the Plato complexity analysis tools. To use the hook, run the following:

```
ln -s ../../post-commit .git/hooks/post-commit
```

View the [code complexity](http://vinceallenvince.github.io/drawing-utils-lib/reports/) report.
