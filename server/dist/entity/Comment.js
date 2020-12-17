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
exports.Comment = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Course_1 = require("./Course");
const Professor_1 = require("./Professor");
const Student_1 = require("./Student");
let Comment = class Comment extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field(() => Student_1.Student),
    typeorm_1.ManyToOne(() => Student_1.Student),
    __metadata("design:type", Student_1.Student)
], Comment.prototype, "student", void 0);
__decorate([
    type_graphql_1.Field(() => Course_1.Course),
    typeorm_1.ManyToOne(() => Course_1.Course),
    __metadata("design:type", Course_1.Course)
], Comment.prototype, "course", void 0);
__decorate([
    type_graphql_1.Field(() => Professor_1.Professor),
    typeorm_1.ManyToOne(() => Professor_1.Professor),
    __metadata("design:type", Professor_1.Professor)
], Comment.prototype, "professor", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
Comment = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map