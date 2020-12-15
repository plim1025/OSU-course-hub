import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Course } from './entity/Course';
import { Textbook } from './entity/Textbook';
import { Comment } from './entity/Comment';
import { Professor } from './entity/Professor';

createConnection()
    .then(async connection => {
        // const textbook1 = new Textbook();
        // textbook1.ISBN = '999';
        // textbook1.title = 'mock title';
        // textbook1.author = 'mock author';
        // textbook1.edition = 1;
        // textbook1.copyrightYear = 2000;
        // await connection.manager.save(textbook1);
        // const textbook2 = new Textbook();
        // textbook2.ISBN = '998';
        // textbook2.title = 'mock title';
        // textbook2.author = 'mock author';
        // textbook2.edition = 1;
        // textbook2.copyrightYear = 2000;
        // await connection.manager.save(textbook2);
        // const comment = new Comment();
        // comment.text = 'mock text';
        // await connection.manager.save(comment);
        const professor1 = new Professor();
        professor1.name = 'mock name';
        await connection.manager.save(professor1);
        // const professor2 = new Professor();
        // professor2.name = 'test name';
        // await connection.manager.save(professor2);
        // const course = new Course();
        // course.department = 'CS';
        // course.number = 161;
        // course.difficulty = [1, 2, 3];
        // course.quality = [1, 2, 3];
        // course.textbooks = [textbook1, textbook2];
        // course.professors = [professor1, professor2];
        // await connection.manager.save(course);
        const prof = await connection
            .createQueryBuilder()
            .select('professor')
            .from(Professor, 'professor')
            .where('professor.name = :name', { name: 'mock name' })
            .getOne();
        if (prof) {
            prof?.difficulty.push(2);
            await connection.manager.save(prof);
        }
    })
    .catch(error => console.log(error));
