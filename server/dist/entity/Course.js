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
exports.Course = void 0;
const typeorm_1 = require("typeorm");
const Textbook_1 = require("./Textbook");
const Comment_1 = require("./Comment");
const TaughtCourse_1 = require("./TaughtCourse");
let Course = class Course {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Course.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(() => TaughtCourse_1.TaughtCourse, taughtCourses => taughtCourses.course),
    __metadata("design:type", Array)
], Course.prototype, "taughtCourses", void 0);
__decorate([
    typeorm_1.OneToMany(() => Comment_1.Comment, comment => comment.course),
    __metadata("design:type", Array)
], Course.prototype, "comments", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Course.prototype, "difficulty", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "quality", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "textbookISBN", void 0);
__decorate([
    typeorm_1.OneToOne(() => Textbook_1.Textbook),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Textbook_1.Textbook)
], Course.prototype, "textbook", void 0);
Course = __decorate([
    typeorm_1.Entity()
], Course);
exports.Course = Course;
//# sourceMappingURL=Course.js.map