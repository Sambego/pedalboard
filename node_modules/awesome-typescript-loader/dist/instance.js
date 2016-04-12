"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const host_1 = require('./host');
const colors = require('colors');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const tsconfig = require('tsconfig');
const helpers_1 = require('./helpers');
const deps_1 = require('./deps');
const checker_1 = require('./checker');
const tsconfig_utils_1 = require('./tsconfig-utils');
const resolver_1 = require('./resolver');
let pkg = require('../package.json');
function getRootCompiler(compiler) {
    if (compiler.parentCompilation) {
        return getRootCompiler(compiler.parentCompilation.compiler);
    }
    else {
        return compiler;
    }
}
function getInstanceStore(compiler) {
    let store = getRootCompiler(compiler)._tsInstances;
    if (store) {
        return store;
    }
    else {
        throw new Error('Can not resolve instance store');
    }
}
function ensureInstanceStore(compiler) {
    let rootCompiler = getRootCompiler(compiler);
    if (!rootCompiler._tsInstances) {
        rootCompiler._tsInstances = {};
    }
}
function resolveInstance(compiler, instanceName) {
    return getInstanceStore(compiler)[instanceName];
}
const COMPILER_ERROR = colors.red(`\n\nTypescript compiler cannot be found, please add it to your package.json file:
    npm install --save-dev typescript
`);
const BABEL_ERROR = colors.red(`\n\nBabel compiler cannot be found, please add it to your package.json file:
    npm install --save-dev babel-core
`);
let id = 0;
function ensureInstance(webpack, options, instanceName) {
    ensureInstanceStore(webpack._compiler);
    let exInstance = resolveInstance(webpack._compiler, instanceName);
    if (exInstance) {
        return exInstance;
    }
    let tsFlow = Promise.resolve();
    let compilerName = options.compiler || 'typescript';
    let compilerPath = path.dirname(compilerName);
    if (compilerPath == '.') {
        compilerPath = compilerName;
    }
    let tsImpl;
    try {
        tsImpl = require(compilerPath);
    }
    catch (e) {
        console.error(e);
        console.error(COMPILER_ERROR);
        process.exit(1);
    }
    let libPath = path.join(compilerPath, 'lib', 'lib.d.ts');
    let lib6Path = path.join(compilerPath, 'lib', 'lib.es6.d.ts');
    try {
        require.resolve(libPath);
    }
    catch (e) {
        libPath = path.join(compilerPath, 'bin', 'lib.d.ts');
        lib6Path = path.join(compilerPath, 'bin', 'lib.es6.d.ts');
    }
    let compilerInfo = {
        compilerName,
        compilerPath,
        tsImpl,
        lib5: helpers_1.loadLib(libPath),
        lib6: helpers_1.loadLib(lib6Path)
    };
    _.defaults(options, {
        resolveGlobs: true
    });
    let configFilePath;
    let configFile;
    if (options.tsconfig && options.tsconfig.match(/\.json$/)) {
        configFilePath = options.tsconfig;
    }
    else {
        configFilePath = tsconfig.resolveSync(options.tsconfig || process.cwd());
    }
    if (configFilePath) {
        let content = fs.readFileSync(configFilePath).toString();
        configFile = tsconfig_utils_1.parseContent(content, configFilePath);
        if (options.resolveGlobs) {
            tsconfig_utils_1.tsconfigSuggestions(configFile);
            configFile = tsconfig.readFileSync(configFilePath, { filterDefinitions: true });
        }
    }
    let tsFiles = [];
    if (configFile) {
        if (configFile.compilerOptions) {
            _.extend(options, configFile.compilerOptions);
            _.extend(options, configFile.awesomeTypescriptLoaderOptions);
            options.exclude = configFile.exclude || [];
            tsFiles = configFile.files;
        }
    }
    options = tsconfig_utils_1.rawToTsCompilerOptions(options, path.dirname(configFilePath), tsImpl);
    _.defaults(options, {
        externals: [],
        doTypeCheck: true,
        sourceMap: true,
        verbose: false,
        noLib: false,
        suppressOutputPathCheck: true,
        sourceRoot: process.cwd()
    });
    options = _.omit(options, 'outDir', 'files', 'out');
    options.externals.push.apply(options.externals, tsFiles);
    let babelImpl;
    if (options.useBabel) {
        try {
            babelImpl = require(path.join(process.cwd(), 'node_modules', 'babel-core'));
        }
        catch (e) {
            console.error(BABEL_ERROR);
            process.exit(1);
        }
    }
    let cacheIdentifier = null;
    if (options.useCache) {
        if (!options.cacheDirectory) {
            options.cacheDirectory = path.join(process.cwd(), '.awcache');
        }
        if (!fs.existsSync(options.cacheDirectory)) {
            fs.mkdirSync(options.cacheDirectory);
        }
        cacheIdentifier = {
            'typescript': tsImpl.version,
            'awesome-typescript-loader': pkg.version,
            'awesome-typescript-loader-query': webpack.query,
            'babel-core': babelImpl
                ? babelImpl.version
                : null
        };
    }
    let forkChecker = options.forkChecker && getRootCompiler(webpack._compiler)._tsFork;
    let resolver = resolver_1.default(webpack._compiler.options);
    let syncResolver = resolver.resolveSync.bind(resolver);
    let tsState = new host_1.State(options, webpack._compiler.inputFileSystem, compilerInfo, syncResolver);
    let compiler = webpack._compiler;
    setupWatchRun(compiler, instanceName);
    if (options.doTypeCheck) {
        setupAfterCompile(compiler, instanceName, forkChecker);
    }
    let webpackOptions = _.pick(webpack._compiler.options, 'resolve');
    let atlOptions = webpack.options.atl;
    let plugins = [];
    if (atlOptions && atlOptions.plugins) {
        plugins = atlOptions.plugins;
    }
    let initedPlugins = [];
    if (!forkChecker) {
        initedPlugins = plugins.map(plugin => {
            return require(plugin.file)(plugin.options);
        });
    }
    return getInstanceStore(webpack._compiler)[instanceName] = {
        id: ++id,
        tsFlow,
        tsState,
        babelImpl,
        compiledFiles: {},
        options,
        externalsInvoked: false,
        checker: forkChecker
            ? checker_1.createChecker(compilerInfo, options, webpackOptions, plugins)
            : null,
        cacheIdentifier,
        plugins,
        initedPlugins,
        externalsInvocation: null
    };
}
exports.ensureInstance = ensureInstance;
function setupWatchRun(compiler, instanceName) {
    compiler.plugin('watch-run', function (watching, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let compiler = watching.compiler;
            let instance = resolveInstance(watching.compiler, instanceName);
            let state = instance.tsState;
            let resolver = deps_1.createResolver(compiler.options.externals, state.options.exclude || [], watching.compiler.resolvers.normal.resolve);
            let mtimes = watching.compiler.watchFileSystem.watcher.mtimes;
            let changedFiles = Object.keys(mtimes);
            changedFiles.forEach((changedFile) => {
                state.fileAnalyzer.validFiles.markFileInvalid(changedFile);
            });
            try {
                let tasks = changedFiles.map(function (changedFile) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (/\.ts$|\.d\.ts$|\.tsx$|\.js$|\.jsx$/.test(changedFile)) {
                            yield state.readFileAndUpdate(changedFile);
                            yield state.fileAnalyzer.checkDependencies(resolver, changedFile);
                        }
                    });
                });
                yield Promise.all(tasks);
                state.updateProgram();
                callback();
            }
            catch (err) {
                console.error(err.toString());
                callback();
            }
        });
    });
}
let runChecker = (instance, payload) => {
    instance.checker.send({
        messageType: 'compile',
        payload
    });
};
runChecker = _.debounce(runChecker, 200);
function setupAfterCompile(compiler, instanceName, forkChecker = false) {
    compiler.plugin('after-compile', function (compilation, callback) {
        let instance = resolveInstance(compilation.compiler, instanceName);
        let state = instance.tsState;
        if (forkChecker) {
            let payload = {
                files: state.allFiles(),
                resolutionCache: state.host.moduleResolutionHost.resolutionCache
            };
            runChecker(instance, payload);
        }
        else {
            if (!state.program) {
                state.updateProgram();
            }
            let diagnostics = state.ts.getPreEmitDiagnostics(state.program);
            let emitError = (err) => {
                if (compilation.bail) {
                    console.error('Error in bail mode:', err);
                    process.exit(1);
                }
                compilation.errors.push(new Error(err));
            };
            let errors = helpers_1.formatErrors(instanceName, diagnostics);
            errors.forEach(emitError);
            instance.initedPlugins.forEach(plugin => {
                plugin.processProgram(state.program);
            });
        }
        let phantomImports = [];
        state.allFileNames().forEach((fileName) => {
            if (!instance.compiledFiles[fileName]) {
                phantomImports.push(fileName);
            }
        });
        instance.compiledFiles = {};
        compilation.fileDependencies.push.apply(compilation.fileDependencies, phantomImports);
        compilation.fileDependencies = _.uniq(compilation.fileDependencies);
        callback();
    });
}
//# sourceMappingURL=instance.js.map