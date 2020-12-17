import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import {Textbook} from './Textbook';
import {Comment} from './Comment'
import { TaughtCourse } from './TaughtCourse';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number; //course id

    //many to many
    @OneToMany(() => TaughtCourse, taughtCourses => taughtCourses.course) //taught courses (w/ different professors) relation
    taughtCourses: TaughtCourse[];

    @OneToMany(() => Comment, comment => comment.course) //comments relation
    comments: Comment[];

    @Column()
    difficulty: number;

    @Column()
    quality: string;

    @Column()
    textbookISBN: string;

    //many to many
    @OneToOne(() => Textbook) //textbook relation
    @JoinColumn()
    textbook: Textbook;
}
