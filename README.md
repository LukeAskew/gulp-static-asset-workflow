# Gulp Static Asset Workflow

> A Gulp.js workflow for developing static assets


## Quick Start

Download, include in your project, and run:

```
$ npm start
```

## Features

- Sass [compilation](https://github.com/sass/node-sass), [vendor prefixing](https://github.com/postcss/autoprefixer), and [minification](https://github.com/css/csso)
- JavaScript [module bundling](https://github.com/substack/node-browserify) and [optimization](https://github.com/mishoo/UglifyJS2)
- Image [optimization](https://github.com/imagemin/imagemin)
- Local development with real-time compiliation
- File size reporting
- Code formatting rules ([EditorConfig](http://editorconfig.org/) and [JS Beautifier](https://github.com/beautify-web/js-beautify))

## Usage

### Local Development

Start a local development environment that compiles assets, watches for changes, then recompiles as needed:

```
$ npm start
```

### Build

Optimized build:

```
$ npm run build
```

## Configuration

Several configurable paths and options are stored in the gulpfile's `config` object.

### config.browsers 

Type: `Array`

Supported browsers for your project; used for CSS vendor prefixes. See [Autoprefixer](https://github.com/postcss/autoprefixer#browsers) for possible values.

### config.dest

Type: `String`

Folder where assets are to be saved.

### config.dev

Type: `Boolean`

Flag for whether or not script should be running as a development environment (watching, recompiling). This value is passed in as a command line flag. (e.g. `$ gulp --dev`)

### config.dest

Type: `Object`

Where to output assets.

#### config.dest.images

Type: `String` or `Array`

#### config.dest.scripts

Type: `String` or `Array`

#### config.dest.styles

Type: `String` or `Array`

### config.src

Type: `Object`

Pointer to source files.

#### config.src.images

Type: `String` or `Array`

#### config.src.scripts

Type: `String` or `Array`

#### config.src.styles

Type: `String` or `Array`





