import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';

@Entity()
@ObjectType()
export class Professor {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => [Int])
    @Column('int', { array: true })
    difficulty: number[] = [];

    @Field(() => [Int])
    @Column('int', { array: true })
    quality: number[] = [];

    @Field(() => [Comment])
    @OneToMany(() => Comment, comment => comment.professor)
    comments: Comment[];
}
