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
describe('salsa test', function () {
    it('should compile js file', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let config = {
                entry: utils_1.fixturePath(['salsa', 'index.ts'])
            };
            let tsconfig = utils_1.fixturePath(['salsa', 'tsconfig.json']);
            let loaderParams = `&tsconfig=${tsconfig}`;
            let exclude = [/exclude/];
            let stats = yield utils_1.cleanAndCompile(utils_1.createConfig(config, { loaderParams, exclude }));
            console.log(stats.compilation.errors);
            utils_1.expect(stats.compilation.errors.length).eq(2);
            utils_1.expect(stats.compilation.errors[0].toString()).include('Cannot find module');
            utils_1.expect(stats.compilation.errors[1].toString()).include(`Argument of type 'string'`);
        });
    });
});
//# sourceMappingURL=salsa.js.map