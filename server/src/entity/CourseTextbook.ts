import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Course } from './Course';
import { Textbook } from './Textbook';

@Entity()
@ObjectType()
export class CourseTextbook extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn()
    readonly courseID: number;

    @Field(() => ID)
    @PrimaryColumn()
    readonly ISBN: string;

    @Field()
    @Column()
    termUsed: string;

    @Field()
    @Column()
    yearUsed: number;

    @ManyToOne(() => Course, course => course.courseTextbook)
    course: Course;

    @ManyToOne(() => Textbook, textbook => textbook.courseTextbook)
    textbook: Textbook;
}
