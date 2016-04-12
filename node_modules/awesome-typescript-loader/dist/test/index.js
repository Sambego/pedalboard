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
describe('main test', function () {
    it('should compile simple file', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let config = {
                entry: utils_1.fixturePath(['basic', 'basic.ts'])
            };
            let stats = yield utils_1.cleanAndCompile(utils_1.createConfig(config));
            utils_1.expect(stats.compilation.errors.length).eq(0);
            let result = yield utils_1.readOutputFile();
            let expectation = yield utils_1.readFixture(['basic', 'basic.js']);
            utils_1.expectSource(result, expectation);
        });
    });
    it('should check typing', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let config = {
                entry: utils_1.fixturePath(['errors', 'with-type-errors.ts'])
            };
            let stats = yield utils_1.cleanAndCompile(utils_1.createConfig(config));
            utils_1.expect(stats.compilation.errors.length).eq(1);
        });
    });
    it('should load tsx files and use tsconfig', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let tsConfig = utils_1.fixturePath(['tsx', 'tsconfig.json']);
            let config = {
                entry: utils_1.fixturePath(['tsx', 'basic.tsx'])
            };
            let loaderParams = `&tsconfig=${tsConfig}`;
            let stats = yield utils_1.cleanAndCompile(utils_1.createConfig(config, { loaderParams }));
            utils_1.expect(stats.compilation.errors.length).eq(1);
            let result = yield utils_1.readOutputFile();
            let expectation = 'return React.createElement("div", null, "hi there");';
            utils_1.expectSource(result, expectation);
        });
    });
});
//# sourceMappingURL=index.js.map