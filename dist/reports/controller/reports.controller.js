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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportsController = void 0;
var policeReport_entity_1 = require("../entity/policeReport.entity");
var user_entity_1 = require("../../users/entity/user.entity");
var reportsController = function (con) {
    var reportsRepo = con.getRepository(policeReport_entity_1.PoliceReport);
    var userRepo = con.getRepository(user_entity_1.User);
    return [
        {
            method: 'GET',
            path: '/reports',
            handler: function (request, h, err) {
                return reportsRepo.find();
            },
        },
        {
            method: 'GET',
            path: '/reports/{id}',
            handler: function (_a, h, err) {
                var id = _a.params.id;
                return reportsRepo.findOne({
                    where: { id: +id },
                    relations: ['third']
                });
            },
        },
        {
            method: 'POST',
            path: '/reports',
            handler: function (_a, h, err) {
                var payload = _a.payload, user = _a.auth.credentials.user;
                return __awaiter(void 0, void 0, void 0, function () {
                    var createReportsDto, third, p;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                createReportsDto = payload;
                                return [4 /*yield*/, Promise.all(createReportsDto.third.map(function (u) { return __awaiter(void 0, void 0, void 0, function () {
                                        var user, obj;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, userRepo.query("\n            SELECT * FROM users\n            WHERE document = '".concat(u.document, "' "))];
                                                case 1:
                                                    user = _a.sent();
                                                    if (!(user.length > 0)) return [3 /*break*/, 2];
                                                    return [2 /*return*/, user[0]];
                                                case 2:
                                                    obj = userRepo.create({
                                                        firstName: u.firstName,
                                                        lastName: u.lastName,
                                                        email: u.email,
                                                        document: u.document,
                                                        driverLicense: u.driverLicense,
                                                        password: '1234'
                                                    });
                                                    return [4 /*yield*/, userRepo.save(obj)];
                                                case 3: return [2 /*return*/, _a.sent()];
                                            }
                                        });
                                    }); }))];
                            case 1:
                                third = _b.sent();
                                p = reportsRepo.create(__assign(__assign({ user_id: user.id }, createReportsDto), { third: third }));
                                return [2 /*return*/, reportsRepo.save(p)];
                        }
                    });
                });
            },
        },
        {
            method: 'PATCH',
            path: '/reports/{id}',
            handler: function (_a, h, err) {
                var id = _a.params.id, payload = _a.payload;
                return __awaiter(void 0, void 0, void 0, function () {
                    var p;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, reportsRepo.findOne({
                                    where: { id: +id }
                                })];
                            case 1:
                                p = _b.sent();
                                Object.keys(payload).forEach(function (key) { return (p[key] = payload[key]); });
                                reportsRepo.update(id, p);
                                return [2 /*return*/, p];
                        }
                    });
                });
            },
        },
        {
            method: 'DELETE',
            path: '/reports/{id}',
            handler: function (_a, h, err) {
                var id = _a.params.id;
                return __awaiter(void 0, void 0, void 0, function () {
                    var p;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, reportsRepo.findOne({
                                    where: { id: +id }
                                })];
                            case 1:
                                p = _b.sent();
                                reportsRepo.remove(p);
                                return [2 /*return*/, p];
                        }
                    });
                });
            },
        },
    ];
};
exports.reportsController = reportsController;
//# sourceMappingURL=reports.controller.js.map