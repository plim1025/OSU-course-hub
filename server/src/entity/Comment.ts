import { Field, ID, ObjectType } from 'type-graphql';
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
@ObjectType()
export class Comment {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    text: string;

    @Field(() => Student)
    @ManyToOne(() => Student)
    student: Student;

    @Field(() => Course)
    @ManyToOne(() => Course)
    course: Course;

    @Field(() => Professor)
    @ManyToOne(() => Professor)
    professor: Professor;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
