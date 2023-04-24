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
exports.PoliceReport = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entity/user.entity");
var PoliceReport = /** @class */ (function () {
    function PoliceReport() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], PoliceReport.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PoliceReport.prototype, "customerVehiculePlate", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PoliceReport.prototype, "customerDocument", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PoliceReport.prototype, "policeReport", void 0);
    __decorate([
        (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.police_report; }),
        __metadata("design:type", user_entity_1.User)
    ], PoliceReport.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], PoliceReport.prototype, "user_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Array)
    ], PoliceReport.prototype, "vehiclesInvolved", void 0);
    __decorate([
        (0, typeorm_1.JoinTable)({ name: 'users_incidents' }),
        (0, typeorm_1.ManyToMany)(function () { return user_entity_1.User; }, function (third) { return third.incidents; }),
        __metadata("design:type", Array)
    ], PoliceReport.prototype, "third", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
        __metadata("design:type", Date)
    ], PoliceReport.prototype, "createdAt", void 0);
    PoliceReport = __decorate([
        (0, typeorm_1.Entity)('police_report')
    ], PoliceReport);
    return PoliceReport;
}());
exports.PoliceReport = PoliceReport;
//# sourceMappingURL=policeReport.entity.js.map