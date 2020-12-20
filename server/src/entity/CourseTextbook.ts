import { Field, ID, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Course } from './Course';
import { Textbook } from './Textbook';

@Entity()
@ObjectType()
export class CourseTextbook extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn()
    readonly courseId: number;

    @Field(() => ID)
    @PrimaryColumn()
    readonly ISBN: string;

    @Field(() => Course)
    @OneToOne(() => Course)
    @JoinColumn()
    course: Course;

    @Field(() => Textbook)
    @OneToOne(() => Textbook)
    @JoinColumn()
    textbook: Textbook;

    @Field()
    @Column()
    termUsed: string;
}
