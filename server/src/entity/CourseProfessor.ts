import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Course } from './Course';
import { Professor } from './Professor';

@Entity()
@ObjectType()
export class CourseProfessor extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn()
    readonly courseID: number;

    @Field(() => ID)
    @PrimaryColumn()
    readonly professorID: number;

    @Field()
    @Column()
    termTaught: string;

    @Field()
    @Column()
    yearTaught: number;

    @ManyToOne(() => Course, course => course.courseProfessor)
    course: Course;

    @ManyToOne(() => Professor, professor => professor.courseProfessor)
    professor: Professor;
}
