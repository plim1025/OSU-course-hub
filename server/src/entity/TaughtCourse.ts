import { Entity, PrimaryGeneratedColumn, Column,
     OneToOne, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import {Course} from './Course';
import {Professor} from './Professor';

//for relating professor to course through many to many

@Entity()
export class TaughtCourse {
    @PrimaryGeneratedColumn()
    id: string;

    //many to many
    @ManyToOne(() => Professor, professor => professor.courses) //professor relation
    professor: Professor;

    @ManyToOne(() => Course, course => course.taughtCourses) //course relation
    course: Course;

}