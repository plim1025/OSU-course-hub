import { Field, ID, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CourseTextbook } from './CourseTextbook';

@Entity()
@ObjectType()
export class Textbook extends BaseEntity {
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

    @OneToMany(() => CourseTextbook, courseTextbook => courseTextbook.textbook)
    courseTextbook: CourseTextbook[];
}
