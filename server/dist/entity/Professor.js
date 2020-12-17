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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professor = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Comment_1 = require("./Comment");
let Professor = class Professor extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.difficulty = [];
        this.quality = [];
    }
    averageDifficulty(parent) {
        if (parent.difficulty.length) {
            return (Math.round((parent.difficulty.reduce((a, b) => a + b) / parent.difficulty.length) * 10) / 10);
        }
        return null;
    }
    averageQuality(parent) {
        if (parent.quality.length) {
            return (Math.round((parent.quality.reduce((a, b) => a + b) / parent.quality.length) * 10) /
                10);
        }
        return null;
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Professor.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Professor.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Professor.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(() => [type_graphql_1.Int]),
    typeorm_1.Column('int', { array: true }),
    __metadata("design:type", Array)
], Professor.prototype, "difficulty", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Professor]),
    __metadata("design:returntype", Object)
], Professor.prototype, "averageDifficulty", null);
__decorate([
    type_graphql_1.Field(() => [type_graphql_1.Int]),
    typeorm_1.Column('int', { array: true }),
    __metadata("design:type", Array)
], Professor.prototype, "quality", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Professor]),
    __metadata("design:returntype", Object)
], Professor.prototype, "averageQuality", null);
__decorate([
    type_graphql_1.Field(() => [Comment_1.Comment]),
    typeorm_1.OneToMany(() => Comment_1.Comment, comment => comment.professor),
    __metadata("design:type", Array)
], Professor.prototype, "comments", void 0);
Professor = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Professor);
exports.Professor = Professor;
//# sourceMappingURL=Professor.js.map