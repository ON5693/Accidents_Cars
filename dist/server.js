"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
var Hapi = __importStar(require("@hapi/hapi"));
require("colors");
var node_emoji_1 = require("node-emoji");
var data_source_1 = require("./data-source");
var user_controller_1 = require("./users/controller/user.controller");
var auth_controller_1 = require("./auth/controller/auth.controller");
var reports_controller_1 = require("./reports/controller/reports.controller");
var vehicle_controller_1 = require("./vehicles/controller/vehicle.controller");
var auth_1 = require("./auth");
var server = Hapi.server({
    port: 3000,
    host: 'localhost',
});
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, server.start().then()];
            case 1:
                _a.sent();
                console.log((0, node_emoji_1.get)('rocket'), "Server running on ".concat(server.info.uri).green, (0, node_emoji_1.get)('rocket'));
                return [2 /*return*/, server];
        }
    });
}); };
exports.start = start;
var init = function () { return __awaiter(void 0, void 0, void 0, function () {
    var con;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, server.register(require('hapi-auth-jwt2'))];
            case 1:
                _a.sent();
                return [4 /*yield*/, server.register(require('@hapi/basic'))];
            case 2:
                _a.sent();
                return [4 /*yield*/, data_source_1.AppDataSource.initialize()];
            case 3:
                con = _a.sent();
                server.auth.strategy('simple', 'basic', { validate: (0, auth_1.validateBasic)(con) });
                server.auth.strategy('jwt', 'jwt', {
                    key: 'fromEnvFile',
                    validate: (0, auth_1.validateJWT)(con), // validate function defined above
                });
                server.auth.default('jwt');
                console.log((0, node_emoji_1.get)('dvd'), 'DB init -> Done', (0, node_emoji_1.get)('dvd'));
                server.route(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], (0, user_controller_1.userController)(con), true), (0, auth_controller_1.authController)(con), true), (0, reports_controller_1.reportsController)(con), true), (0, vehicle_controller_1.vehicleController)(con), true));
                (0, exports.start)();
                process.on('unhandledRejection', function (err) {
                    console.log(err);
                    process.exit(1);
                });
                return [2 /*return*/];
        }
    });
}); };
init();
//# sourceMappingURL=server.js.map