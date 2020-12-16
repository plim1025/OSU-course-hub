import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Course } from './Course';

@Entity()
@ObjectType()
export class Textbook {
    @Field(() => ID)
    @PrimaryColumn()
    readonly ISBN: string;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    author: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    coverImageUrl?: string;

    @Field(() => Int)
    @Column()
    edition: number;

    @Field(() => Int)
    @Column()
    copyrightYear: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    priceNewUSD?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    priceUsedUSD?: number;

    @Field(() => Course)
    @ManyToOne(() => Course, course => course.textbooks)
    course: Course;
}
