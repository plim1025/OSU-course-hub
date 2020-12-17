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
exports.CourseTextbook = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Course_1 = require("./Course");
const Textbook_1 = require("./Textbook");
let CourseTextbook = class CourseTextbook extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], CourseTextbook.prototype, "courseId", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], CourseTextbook.prototype, "ISBN", void 0);
__decorate([
    type_graphql_1.Field(() => Course_1.Course),
    typeorm_1.OneToOne(() => Course_1.Course),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Course_1.Course)
], CourseTextbook.prototype, "course", void 0);
__decorate([
    type_graphql_1.Field(() => Textbook_1.Textbook),
    typeorm_1.OneToOne(() => Textbook_1.Textbook),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Textbook_1.Textbook)
], CourseTextbook.prototype, "textbook", void 0);
CourseTextbook = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], CourseTextbook);
exports.CourseTextbook = CourseTextbook;
//# sourceMappingURL=CourseTextbook.js.map