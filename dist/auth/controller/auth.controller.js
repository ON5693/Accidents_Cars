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
exports.authController = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var Joi = require("@hapi/joi");
var user_entity_1 = require("../../users/entity/user.entity");
var authController = function (con) {
    var userRepo = con.getRepository(user_entity_1.User);
    return [
        {
            method: 'POST',
            path: '/register',
            handler: function (_a) {
                var payload = _a.payload;
                return __awaiter(this, void 0, void 0, function () {
                    var _b, firstName, lastName, email, document, driverLicense, password, u, error_1;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 2, , 3]);
                                _b = payload, firstName = _b.firstName, lastName = _b.lastName, email = _b.email, document = _b.document, driverLicense = _b.driverLicense, password = _b.password;
                                u = userRepo.create({
                                    firstName: firstName,
                                    lastName: lastName,
                                    email: email,
                                    document: document,
                                    driverLicense: driverLicense,
                                    password: password
                                });
                                return [4 /*yield*/, userRepo.save(u)];
                            case 1:
                                _c.sent();
                                return [2 /*return*/, {
                                        user: u,
                                        accessToken: (0, jsonwebtoken_1.sign)(__assign({}, u), 'fromEnvFile'),
                                    }];
                            case 2:
                                error_1 = _c.sent();
                                console.error(error_1);
                                return [2 /*return*/, { err: 'something went wrong :(' }];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
            options: {
                auth: false,
                validate: {
                    payload: Joi.object({
                        firstName: Joi.string().required().max(250).min(3),
                        lastName: Joi.string().required().max(250).min(3),
                        email: Joi.string().required().max(250).min(4),
                        document: Joi.string().required().max(11).min(11),
                        driverLicense: Joi.string().required().max(30).min(10),
                        password: Joi.string().required().min(1).max(15),
                    }),
                    failAction: function (request, h, err) {
                        throw err;
                    },
                    options: {
                        abortEarly: false,
                    },
                },
            },
        },
        {
            method: 'POST',
            path: '/login',
            handler: function (_a) {
                var credentials = _a.auth.credentials;
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        return [2 /*return*/, __assign(__assign({}, credentials), { accessToken: (0, jsonwebtoken_1.sign)(__assign({}, credentials), 'fromEnvFile') })];
                    });
                });
            },
            options: {
                auth: {
                    strategy: 'simple',
                },
            },
        },
    ];
};
exports.authController = authController;
//# sourceMappingURL=auth.controller.js.map