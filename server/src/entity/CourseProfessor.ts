import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Course } from './Course';
import { Professor } from './Professor';

@Entity()
@ObjectType()
export class CourseProfessor extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn()
    readonly courseId: number;

    @Field(() => ID)
    @PrimaryColumn()
    readonly professorId: string;

    @Field(() => Course)
    @OneToOne(() => Course)
    @JoinColumn()
    course: Course;

    @Field(() => Professor)
    @OneToOne(() => Professor)
    @JoinColumn()
    professor: Professor;
}
