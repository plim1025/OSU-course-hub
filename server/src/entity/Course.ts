import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';
import { Textbook } from './Textbook';

@Entity()
@ObjectType()
export class Course {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    department: string;

    @Field(() => Int)
    @Column()
    number: number;

    @Field(() => [Int])
    @Column({ type: 'int', array: true })
    difficulty: number[] = [];

    @Field(() => [Int])
    @Column({ type: 'int', array: true })
    quality: number[] = [];

    @Field(() => [Textbook])
    @OneToMany(() => Textbook, textbook => textbook.course)
    textbooks: Textbook[];

    @Field(() => [Comment])
    @OneToMany(() => Comment, comment => comment.course)
    comments: Comment[];
}
