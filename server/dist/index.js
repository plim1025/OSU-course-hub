"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Course_1 = require("./entity/Course");
const Comment_1 = require("./entity/Comment");
const Professor_1 = require("./entity/Professor");
const Student_1 = require("./entity/Student");
const TaughtCourse_1 = require("./entity/TaughtCourse");
const Textbook_1 = require("./entity/Textbook");
typeorm_1.createConnection()
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const entityManager = typeorm_1.getManager();
    const textbook = new Textbook_1.Textbook();
    textbook.author = "Dennis Ritchie";
    textbook.coverImageURL = "testing.com";
    textbook.edition = 3;
    textbook.title = "Cool";
    textbook.year = 2018;
    console.log('Loading textbooks from the database...');
    const textbooks = yield connection.manager.find(Textbook_1.Textbook);
    console.log('Loaded textbooks: ', textbooks);
    const professor = new Professor_1.Professor();
    professor.avgDifficulty = 7;
    professor.avgQuality = "good";
    professor.name = "Bob";
    console.log('Loading professors from the database...');
    const professors = yield connection.manager.find(Professor_1.Professor);
    console.log('Loaded professors: ', professors);
    const taughtCourse = new TaughtCourse_1.TaughtCourse();
    taughtCourse.professor = professor;
    console.log('Loading taughtCourses from the database...');
    const taughtCourses = yield connection.manager.find(TaughtCourse_1.TaughtCourse);
    console.log('Loaded taughtCourses: ', taughtCourses);
    const student = new Student_1.Student();
    yield connection.manager.save(student);
    console.log('Loading students from the database...');
    const students = yield connection.manager.find(Student_1.Student);
    console.log('Loaded students: ', students);
    const comment = new Comment_1.Comment();
    comment.professor = professor;
    comment.student = student;
    console.log('Loading comments from the database...');
    const comments = yield connection.manager.find(Comment_1.Comment);
    console.log('Loaded comments: ', comments);
    const course = new Course_1.Course();
    course.comments = [comment];
    course.difficulty = 5;
    course.quality = "good";
    course.taughtCourses = [taughtCourse];
    course.textbook = textbook;
    course.textbookISBN = "38949834785";
    console.log('Loading courses from the database...');
    const courses = yield connection.manager.find(Course_1.Course);
    console.log('Loaded courses: ', courses);
}))
    .catch(error => console.log(error));
//# sourceMappingURL=index.js.map