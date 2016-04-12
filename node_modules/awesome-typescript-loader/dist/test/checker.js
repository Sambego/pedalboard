"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const utils_1 = require('./utils');
let ps = require('ps-node');
function getCheckerRuntimeProcess() {
    let opts = {
        command: /node/,
        arguments: /checker-runtime/,
        psargs: 'aux'
    };
    return new Promise((resolve, reject) => {
        ps.lookup(opts, (err, resultList) => {
            resolve(resultList[0]);
        });
    });
}
;
function kill(p) {
    return new Promise((resolve, reject) => {
        ps.kill(p.pid, resolve);
    });
}
;
function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}
;
describe('checker test', function () {
    this.timeout(5000);
    let fixture = utils_1.fixturePath(['checker', 'to-check.ts']);
    let config = utils_1.createConfig({
        entry: fixture,
    }, {
        watch: true,
        forkChecker: true,
        loaderParams: '&+forkChecker'
    });
    it('should fork checker in separate process', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield utils_1.cleanOutputDir();
            let watcher = yield utils_1.watch(config, () => { });
            let pid = yield getCheckerRuntimeProcess();
            utils_1.expect(pid).ok;
            watcher.close();
            yield kill(pid);
        });
    });
    it('should fork only one checker after multiple changes', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield utils_1.cleanOutputDir();
            let watcher = yield utils_1.watch(config, () => { });
            let pid = yield getCheckerRuntimeProcess();
            utils_1.expect(pid).ok;
            let i = 10;
            while (i--) {
                yield utils_1.touchFile(fixture);
                yield sleep(50);
            }
            yield sleep(2000);
            watcher.close();
            yield kill(pid);
        });
    });
});
//# sourceMappingURL=checker.js.map