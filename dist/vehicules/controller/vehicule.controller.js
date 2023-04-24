"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiculeController = void 0;
var vehicules_entity_1 = require("../entity/vehicules.entity");
var vehiculeController = function (con) {
    var carsRepo = con.getRepository(vehicules_entity_1.Vehicules);
    return [
        {
            method: 'GET',
            path: '/vehicules',
            handler: function (_a, h, err) {
                var query = _a.query;
                return __awaiter(void 0, void 0, void 0, function () {
                    var perPage, page, q, realPage, realTake, findOptions, getQuery, handleQuery;
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                perPage = query.perPage, page = query.page, q = __rest(query, ["perPage", "page"]);
                                if (perPage)
                                    realTake = +perPage;
                                else {
                                    perPage = '10';
                                    realTake = 10;
                                }
                                if (page)
                                    realPage = +page === 1 ? 0 : (+page - 1) * realTake;
                                else {
                                    realPage = 0;
                                    page = "1";
                                }
                                findOptions = {
                                    take: realTake,
                                    skip: realPage,
                                    where: __assign({}, q)
                                };
                                if (!q)
                                    delete findOptions.where;
                                getQuery = function () { return Object.keys(q)
                                    .map(function (key) { return "".concat(key, "=").concat(q[key]); })
                                    .join('&'); };
                                handleQuery = getQuery().length === 0 ? '' : "&".concat(getQuery());
                                _b = {};
                                return [4 /*yield*/, carsRepo.find(findOptions)];
                            case 1: return [2 /*return*/, (_b.data = _c.sent(),
                                    _b.perPage = realTake,
                                    _b.page = +page || 1,
                                    _b.next = "http://localhost:3000/vehicules?perPage=".concat(realTake, "&page=").concat(+page + 1).concat(handleQuery),
                                    _b.prev = "http://localhost:3000/vehicules?perPage=".concat(realTake, "&page=").concat(+page - 1).concat(handleQuery),
                                    _b)];
                        }
                    });
                });
            },
        },
        {
            method: 'GET',
            path: '/vehicules/{id}',
            handler: function (_a, h, err) {
                var id = _a.params.id;
                return __awaiter(this, void 0, void 0, function () {
                    var v;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, carsRepo.findOne({
                                    where: { id: +id },
                                    relations: ['users']
                                })];
                            case 1:
                                v = _b.sent();
                                return [2 /*return*/, v];
                        }
                    });
                });
            },
        },
        {
            method: 'POST',
            path: '/vehicules',
            handler: function (_a, h, err) {
                var payload = _a.payload;
                return __awaiter(this, void 0, void 0, function () {
                    var createVehiculeDto, v;
                    return __generator(this, function (_b) {
                        createVehiculeDto = payload;
                        v = carsRepo.create(__assign({}, createVehiculeDto));
                        return [2 /*return*/, carsRepo.save(v)];
                    });
                });
            },
        },
        {
            method: 'PATCH',
            path: '/vehicules/{id}',
            handler: function (request, h, err) { return __awaiter(void 0, void 0, void 0, function () {
                var params, info, v;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = request.params.id;
                            info = request.payload;
                            return [4 /*yield*/, carsRepo.findOne({
                                    where: { id: +params },
                                })];
                        case 1:
                            v = _a.sent();
                            Object.keys(info).forEach(function (key) { return (v[key] = info[key]); });
                            carsRepo.update(+params, v);
                            carsRepo.save(v);
                            return [2 /*return*/, v];
                    }
                });
            }); },
        },
        {
            method: 'DELETE',
            path: '/vehicules/{id}',
            handler: function (_a, h, err) {
                var id = _a.params.id;
                return __awaiter(void 0, void 0, void 0, function () {
                    var v;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, carsRepo.findOne({
                                    where: { id: +id },
                                })];
                            case 1:
                                v = _b.sent();
                                carsRepo.remove(v);
                                return [2 /*return*/, v];
                        }
                    });
                });
            },
        },
    ];
};
exports.vehiculeController = vehiculeController;
//# sourceMappingURL=vehicule.controller.js.map