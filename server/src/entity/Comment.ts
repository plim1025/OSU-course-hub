import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Course } from './Course';
import { Professor } from './Professor';
import { Student } from './Student';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ nullable: true })
    studentONID: string;

    @ManyToOne(() => Student, student => student.comments)
    student: Student;

    @Column({ nullable: true })
    courseId: number;

    @ManyToOne(() => Course, course => course.comments)
    course: Course;

    @Column({ nullable: true })
    professorId: number;

    @ManyToOne(() => Professor, professor => professor.comments)
    professor: Professor;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
