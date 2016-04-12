"use strict";
const fs = require('fs');
const path = require('path');
function withoutExt(fileName) {
    return path.join(path.dirname(fileName), path.basename(fileName).split('.')[0]);
}
function isFileEmit(fileName, outputFileName, sourceFileName) {
    return sourceFileName === fileName
        && (outputFileName.substr(-3) === '.js' || outputFileName.substr(-4) === '.jsx');
}
function isSourceMapEmit(fileName, outputFileName, sourceFileName) {
    return sourceFileName === fileName
        && (outputFileName.substr(-7) === '.js.map' || outputFileName.substr(-8) === '.jsx.map');
}
function findResultFor(output, fileName) {
    let text;
    let sourceMap;
    fileName = withoutExt(path.normalize(fileName));
    for (let i = 0; i < output.outputFiles.length; i++) {
        let o = output.outputFiles[i];
        let outputFileName = path.normalize(o.name);
        let sourceFileName = withoutExt(path.normalize(o.sourceName));
        if (isFileEmit(fileName, outputFileName, sourceFileName)) {
            text = o.text;
        }
        if (isSourceMapEmit(fileName, outputFileName, sourceFileName)) {
            sourceMap = o.text;
        }
    }
    return {
        text: text,
        sourceMap: sourceMap
    };
}
exports.findResultFor = findResultFor;
function codegenErrorReport(errors) {
    return errors
        .map(function (error) {
        return 'console.error(' + JSON.stringify(error) + ');';
    })
        .join('\n');
}
exports.codegenErrorReport = codegenErrorReport;
function formatErrors(instanceName, errors) {
    return errors.map(function (diagnostic) {
        let lineChar;
        if (diagnostic.file) {
            lineChar = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        }
        return (`[${instanceName}] ` + (diagnostic.file ? diagnostic.file.fileName : '')
            + (lineChar ? formatLineChar(lineChar) + ' ' : '') + "\n"
            + (typeof diagnostic.messageText == "string" ?
                diagnostic.messageText :
                formatMessageChain(diagnostic.messageText)));
    });
}
exports.formatErrors = formatErrors;
function formatMessageChain(chain) {
    let result = "";
    let separator = "\n  ";
    let current = chain;
    while (current) {
        result += current.messageText;
        if (!!current.next) {
            result += separator;
            separator += "  ";
        }
        current = current.next;
    }
    return result;
}
exports.formatMessageChain = formatMessageChain;
function formatLineChar(lineChar) {
    return ':' + (lineChar.line + 1) + ':' + lineChar.character;
}
exports.formatLineChar = formatLineChar;
function loadLib(moduleId) {
    let fileName = require.resolve(moduleId);
    let text = fs.readFileSync(fileName, 'utf8');
    return {
        fileName: fileName,
        text: text
    };
}
exports.loadLib = loadLib;
//# sourceMappingURL=helpers.js.map