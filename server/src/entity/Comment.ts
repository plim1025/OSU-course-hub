import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import {Course} from "./Course";
import {Student} from './Student';
import {Professor} from './Professor';

@Entity()
export class Comment {
    //@PrimaryColumn - manually assign type
    //@PrimaryGeneratedColumn("uuid") - generates random string id
    @PrimaryGeneratedColumn()
    readonly id: number; //comment id

    @ManyToOne(() => Course, course => course.comments) //course relation
    course: Course;

    //one to many
    @OneToOne(() => Student) //student relation
    @JoinColumn()
    student: Student;

    @OneToOne(() => Professor) //professor relation
    professor: Professor;

    //@UpdateDateColumn();

}
