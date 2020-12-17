import 'reflect-metadata';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/User';
import { Course } from './entity/Course';
import { Comment } from './entity/Comment';
import { Professor } from './entity/Professor';
import { Student } from './entity/Student';
import { TaughtCourse } from './entity/TaughtCourse';
import { Textbook } from './entity/Textbook';


/* find entity using manager.findOne or responsitory.findOne
e.g. const person = await connection.manager.findOne(Person, 1);
const person = await connection.getRepository(Person).findOne(1); */

//terms: cascades, QueryBuilder

createConnection()
    .then(async connection => {
       /* console.log('Inserting a new user into the database...');
        const user = new User();
        user.firstName = 'Timber';
        user.lastName = 'Saw';
        user.age = 25;
        await connection.manager.save(user);
        console.log(`Saved a new user with id: ${user.id}`);
        console.log('Loading users from the database...');
        const users = await connection.manager.find(User);
        console.log('Loaded users: ', users);
        console.log('Here you can setup and run express/koa/any other framework.');*/

        const entityManager = getManager();
        //await entityManager.delete(Professor, {avgQuality: "good"});
        //await entityManager.delete(Textbook, {year: 2018});
        //await entityManager.delete(TaughtCourse, {id: 1});

        const textbook = new Textbook();
        textbook.author = "Dennis Ritchie";
        textbook.coverImageURL = "testing.com";
        textbook.edition = 3;
        textbook.title = "Cool";
        textbook.year = 2018;
        /*await connection.manager.save(textbook);
        console.log(`Saved a new textbook with id: ${textbook.id}`);*/
        console.log('Loading textbooks from the database...');
        const textbooks = await connection.manager.find(Textbook);
        console.log('Loaded textbooks: ', textbooks);

        const professor = new Professor();
        professor.avgDifficulty = 7;
        professor.avgQuality = "good";
        //professor.courses 
        professor.name = "Bob";
        /*await connection.manager.save(professor);
        console.log(`Saved a new professor with name: ${professor.name}`);*/
        console.log('Loading professors from the database...');
        const professors = await connection.manager.find(Professor);
        console.log('Loaded professors: ', professors);

        const taughtCourse = new TaughtCourse();
        //taughtCourse.course
        taughtCourse.professor = professor;
        /*await connection.manager.save(taughtCourse);
        console.log(`Saved a new taughtCourse with name: ${taughtCourse.professor.name}`);*/
        console.log('Loading taughtCourses from the database...');
        const taughtCourses = await connection.manager.find(TaughtCourse);
        console.log('Loaded taughtCourses: ', taughtCourses);

        const student = new Student();
        await connection.manager.save(student);
        console.log('Loading students from the database...');
        const students = await connection.manager.find(Student);
        console.log('Loaded students: ', students);

        
        const comment = new Comment();
        //comment.course
        comment.professor = professor;
        comment.student = student
        //await connection.manager.save(comment);
        console.log('Loading comments from the database...');
        const comments = await connection.manager.find(Comment);
        console.log('Loaded comments: ', comments);

        
        const course = new Course();
        course.comments = [comment];
        course.difficulty = 5;
        course.quality = "good";
        course.taughtCourses = [taughtCourse];
        course.textbook = textbook;
        course.textbookISBN = "38949834785";
        /*await connection.manager.save(course);
        console.log(`Saved a new course with id: ${course.id}`);*/

        console.log('Loading courses from the database...');
        const courses = await connection.manager.find(Course);
        console.log('Loaded courses: ', courses);

    })
    .catch(error => console.log(error));
