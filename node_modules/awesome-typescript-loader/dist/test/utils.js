"use strict";
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
require('babel-polyfill');
require('source-map-support').install();
const chai_1 = require('chai');
exports.expect = chai_1.expect;
const webpack = require('webpack');
const BPromise = require('bluebird');
const mkdirp = BPromise.promisify(require('mkdirp'));
const rimraf = BPromise.promisify(require('rimraf'));
const readFile = BPromise.promisify(fs.readFile);
const writeFile = BPromise.promisify(fs.writeFile);
const loaderDir = path.join(process.cwd(), 'dist.babel');
const ForkCheckerPlugin = require(loaderDir).ForkCheckerPlugin;
exports.defaultOutputDir = path.join(process.cwd(), 'src', 'test', 'output');
exports.defaultFixturesDir = path.join(process.cwd(), 'src', 'test', 'fixtures');
let defaultOptions = {
    loaderParams: '',
    watch: false,
    forkChecker: false,
};
function createConfig(conf, _options = defaultOptions) {
    let options = _.merge({}, defaultOptions, _options);
    const defaultConfig = {
        watch: false,
        output: {
            path: exports.defaultOutputDir,
            filename: '[name].js'
        },
        resolve: {
            extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
        },
        module: {
            loaders: [
                {
                    test: /\.(tsx?|jsx?)/,
                    loader: loaderDir + '?target=es6' + options.loaderParams,
                },
            ],
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
function fixturePath(fileName, fixturesDir = exports.defaultFixturesDir) {
    return path.join.apply(path, [fixturesDir].concat(fileName));
}
exports.fixturePath = fixturePath;
function readFixture(fileName, fixturesDir = exports.defaultFixturesDir) {
    let filePath = fixturePath(fileName, fixturesDir);
    return readFile(filePath).then(buf => buf.toString());
}
exports.readFixture = readFixture;
function writeFixture(fileName, text, fixturesDir = exports.defaultFixturesDir) {
    let filePath = fixturePath(fileName, fixturesDir);
    return writeFile(filePath, text);
}
exports.writeFixture = writeFixture;
function touchFile(fileName) {
    return readFile(fileName)
        .then(buf => buf.toString())
        .then(source => writeFile(fileName, source));
}
exports.touchFile = touchFile;
function outputFileName(fileName, outputDir = exports.defaultOutputDir) {
    return path.join(exports.defaultOutputDir, fileName);
}
exports.outputFileName = outputFileName;
function readOutputFile(fileName, outputDir = exports.defaultOutputDir) {
    return readFile(outputFileName(fileName || 'main.js', outputDir)).then(buf => buf.toString());
}
exports.readOutputFile = readOutputFile;
function cleanOutputDir(outputDir = exports.defaultOutputDir) {
    return rimraf(outputDir)
        .then(() => mkdirp(outputDir));
}
exports.cleanOutputDir = cleanOutputDir;
function cleanAndCompile(config, outputDir = exports.defaultOutputDir) {
    return cleanOutputDir(outputDir)
        .then(() => compile(config));
}
exports.cleanAndCompile = cleanAndCompile;
function compile(config) {
    return new Promise((resolve, reject) => {
        let compiler = webpack(config);
        compiler.run((err, stats) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(stats);
            }
        });
    });
}
exports.compile = compile;
function watch(config, cb) {
    let compiler = webpack(config);
    return new Promise((resolve, reject) => {
        let watcher = compiler.watch({}, (err, stats) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(watcher);
            }
            cb(err, stats);
        });
    });
}
exports.watch = watch;
//# sourceMappingURL=utils.js.map