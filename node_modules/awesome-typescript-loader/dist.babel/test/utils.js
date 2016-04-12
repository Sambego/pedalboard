"use strict";

var path = require('path');
var fs = require('fs');
var _ = require('lodash');
require('babel-polyfill');
require('source-map-support').install();
var chai_1 = require('chai');
exports.expect = chai_1.expect;
var webpack = require('webpack');
var BPromise = require('bluebird');
var mkdirp = BPromise.promisify(require('mkdirp'));
var rimraf = BPromise.promisify(require('rimraf'));
var readFile = BPromise.promisify(fs.readFile);
var writeFile = BPromise.promisify(fs.writeFile);
var loaderDir = path.join(process.cwd(), 'dist.babel');
var ForkCheckerPlugin = require(loaderDir).ForkCheckerPlugin;
exports.defaultOutputDir = path.join(process.cwd(), 'src', 'test', 'output');
exports.defaultFixturesDir = path.join(process.cwd(), 'src', 'test', 'fixtures');
var defaultOptions = {
    loaderParams: '',
    watch: false,
    forkChecker: false
};
function createConfig(conf) {
    var _options = arguments.length <= 1 || arguments[1] === undefined ? defaultOptions : arguments[1];

    var options = _.merge({}, defaultOptions, _options);
    var defaultConfig = {
        watch: false,
        output: {
            path: exports.defaultOutputDir,
            filename: '[name].js'
        },
        resolve: {
            extensions: ['', '.ts', '.tsx', '.js', '.jsx']
        },
        module: {
            loaders: [{
                test: /\.(tsx?|jsx?)/,
                loader: loaderDir + '?target=es6' + options.loaderParams
            }]
        },
        plugins: []
    };
    if (options.include) {
        defaultConfig.module.loaders[0].include = options.include;
    }
    if (options.exclude) {
        defaultConfig.module.loaders[0].exclude = options.exclude;
    }
    if (options.watch) {
        defaultConfig.watch = true;
    }
    if (options.forkChecker) {
        defaultConfig.plugins.push(new ForkCheckerPlugin());
    }
    return _.merge(defaultConfig, conf);
}
exports.createConfig = createConfig;
function expectSource(source, fragment) {
    chai_1.expect(source.replace(/\s/g, '')).include(fragment.replace(/\s/g, ''));
}
exports.expectSource = expectSource;
function fixturePath(fileName) {
    var fixturesDir = arguments.length <= 1 || arguments[1] === undefined ? exports.defaultFixturesDir : arguments[1];

    return path.join.apply(path, [fixturesDir].concat(fileName));
}
exports.fixturePath = fixturePath;
function readFixture(fileName) {
    var fixturesDir = arguments.length <= 1 || arguments[1] === undefined ? exports.defaultFixturesDir : arguments[1];

    var filePath = fixturePath(fileName, fixturesDir);
    return readFile(filePath).then(function (buf) {
        return buf.toString();
    });
}
exports.readFixture = readFixture;
function writeFixture(fileName, text) {
    var fixturesDir = arguments.length <= 2 || arguments[2] === undefined ? exports.defaultFixturesDir : arguments[2];

    var filePath = fixturePath(fileName, fixturesDir);
    return writeFile(filePath, text);
}
exports.writeFixture = writeFixture;
function touchFile(fileName) {
    return readFile(fileName).then(function (buf) {
        return buf.toString();
    }).then(function (source) {
        return writeFile(fileName, source);
    });
}
exports.touchFile = touchFile;
function outputFileName(fileName) {
    var outputDir = arguments.length <= 1 || arguments[1] === undefined ? exports.defaultOutputDir : arguments[1];

    return path.join(exports.defaultOutputDir, fileName);
}
exports.outputFileName = outputFileName;
function readOutputFile(fileName) {
    var outputDir = arguments.length <= 1 || arguments[1] === undefined ? exports.defaultOutputDir : arguments[1];

    return readFile(outputFileName(fileName || 'main.js', outputDir)).then(function (buf) {
        return buf.toString();
    });
}
exports.readOutputFile = readOutputFile;
function cleanOutputDir() {
    var outputDir = arguments.length <= 0 || arguments[0] === undefined ? exports.defaultOutputDir : arguments[0];

    return rimraf(outputDir).then(function () {
        return mkdirp(outputDir);
    });
}
exports.cleanOutputDir = cleanOutputDir;
function cleanAndCompile(config) {
    var outputDir = arguments.length <= 1 || arguments[1] === undefined ? exports.defaultOutputDir : arguments[1];

    return cleanOutputDir(outputDir).then(function () {
        return compile(config);
    });
}
exports.cleanAndCompile = cleanAndCompile;
function compile(config) {
    return new Promise(function (resolve, reject) {
        var compiler = webpack(config);
        compiler.run(function (err, stats) {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    });
}
exports.compile = compile;
function watch(config, cb) {
    var compiler = webpack(config);
    return new Promise(function (resolve, reject) {
        var watcher = compiler.watch({}, function (err, stats) {
            if (err) {
                reject(err);
            } else {
                resolve(watcher);
            }
            cb(err, stats);
        });
    });
}
exports.watch = watch;
//# sourceMappingURL=utils.js.map
//# sourceMappingURL=utils.js.map