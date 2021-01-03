import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';
import { CourseProfessor } from './CourseProfessor';
import { CourseTextbook } from './CourseTextbook';

@Entity()
@ObjectType()
export class Course extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    department: string;

    @Field()
    @Column()
    number: string;

    @OneToMany(() => Comment, comment => comment.course)
    comments: Comment[];

    @OneToMany(() => CourseProfessor, courseProfessor => courseProfessor.course)
    courseProfessor: CourseProfessor[];

    @OneToMany(() => CourseTextbook, courseTextbook => courseTextbook.course)
    courseTextbook: CourseTextbook[];
}
