"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicules = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entity/user.entity");
var Vehicules = /** @class */ (function () {
    function Vehicules() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
        __metadata("design:type", Number)
    ], Vehicules.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Vehicules.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Vehicules.prototype, "year", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Vehicules.prototype, "plate", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Vehicules.prototype, "brand", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], Vehicules.prototype, "chassis", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Vehicules.prototype, "user_id", void 0);
    __decorate([
        (0, typeorm_1.JoinColumn)({ name: 'userId' }),
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.vehicules; }),
        __metadata("design:type", user_entity_1.User)
    ], Vehicules.prototype, "user", void 0);
    Vehicules = __decorate([
        (0, typeorm_1.Entity)('vehicules')
    ], Vehicules);
    return Vehicules;
}());
exports.Vehicules = Vehicules;
//# sourceMappingURL=vehicules.entity.js.map