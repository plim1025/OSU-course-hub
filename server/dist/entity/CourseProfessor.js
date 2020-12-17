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
exports.CourseProfessor = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Course_1 = require("./Course");
const Professor_1 = require("./Professor");
let CourseProfessor = class CourseProfessor extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], CourseProfessor.prototype, "courseId", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], CourseProfessor.prototype, "professorId", void 0);
__decorate([
    type_graphql_1.Field(() => Course_1.Course),
    typeorm_1.OneToOne(() => Course_1.Course),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Course_1.Course)
], CourseProfessor.prototype, "course", void 0);
__decorate([
    type_graphql_1.Field(() => Professor_1.Professor),
    typeorm_1.OneToOne(() => Professor_1.Professor),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Professor_1.Professor)
], CourseProfessor.prototype, "professor", void 0);
CourseProfessor = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], CourseProfessor);
exports.CourseProfessor = CourseProfessor;
//# sourceMappingURL=CourseProfessor.js.map