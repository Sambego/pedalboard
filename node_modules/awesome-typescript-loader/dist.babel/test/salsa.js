"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var utils_1 = require('./utils');
describe('salsa test', function () {
    it('should compile js file', function () {
        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
            var config, tsconfig, loaderParams, exclude, stats;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            config = {
                                entry: utils_1.fixturePath(['salsa', 'index.ts'])
                            };
                            tsconfig = utils_1.fixturePath(['salsa', 'tsconfig.json']);
                            loaderParams = '&tsconfig=' + tsconfig;
                            exclude = [/exclude/];
                            _context.next = 6;
                            return utils_1.cleanAndCompile(utils_1.createConfig(config, { loaderParams: loaderParams, exclude: exclude }));

                        case 6:
                            stats = _context.sent;

                            console.log(stats.compilation.errors);
                            utils_1.expect(stats.compilation.errors.length).eq(2);
                            utils_1.expect(stats.compilation.errors[0].toString()).include('Cannot find module');
                            utils_1.expect(stats.compilation.errors[1].toString()).include('Argument of type \'string\'');

                        case 11:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    });
});
//# sourceMappingURL=salsa.js.map
//# sourceMappingURL=salsa.js.map