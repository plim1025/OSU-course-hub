import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './Course';
import { Professor } from './Professor';
import { Student } from './Student';

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    text: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    ONID?: string;

    @ManyToOne(() => Student)
    student: Student;

    @Field({ nullable: true })
    @Column({ nullable: true })
    courseID?: number;

    @ManyToOne(() => Course)
    course: Course;

    @Field({ nullable: true })
    @Column({ nullable: true })
    professorID?: number;

    @ManyToOne(() => Professor)
    professor: Professor;

    @Field()
    @CreateDateColumn()
    createdAt: Date;
}
