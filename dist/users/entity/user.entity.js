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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var policeReport_entity_1 = require("../../reports/entity/policeReport.entity");
var bcrypt = __importStar(require("bcrypt"));
var class_transformer_1 = require("class-transformer");
var vehicles_entity_1 = require("../../vehicles/entity/vehicles.entity");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.toJSON = function () {
        return (0, class_transformer_1.instanceToPlain)(this);
    };
    User.prototype.setPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, bcrypt.genSalt()];
                    case 1:
                        salt = _b.sent();
                        _a = this;
                        return [4 /*yield*/, bcrypt.hash(password || this.password, salt)];
                    case 2:
                        _a.password = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "document", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: false }),
        (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true, nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "driverLicense", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
        __metadata("design:type", Date)
    ], User.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return policeReport_entity_1.PoliceReport; }, function (policeReport) { return policeReport.user; }, {
            cascade: true,
        }),
        __metadata("design:type", Array)
    ], User.prototype, "police_report", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return vehicles_entity_1.Vehicles; }, function (vehicles) { return vehicles.user; }, {
            cascade: true,
        }),
        __metadata("design:type", Array)
    ], User.prototype, "vehicles", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return policeReport_entity_1.PoliceReport; }, function (incidents) { return incidents.third; }),
        __metadata("design:type", Array)
    ], User.prototype, "incidents", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        (0, typeorm_1.BeforeUpdate)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], User.prototype, "setPassword", null);
    User = __decorate([
        (0, typeorm_1.Entity)('users')
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.entity.js.map