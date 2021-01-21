import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Comment } from './Comment';

@Entity()
@ObjectType()
export class Student extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn()
    readonly ONID: string;

    @Field(() => [Number])
    @Column({ type: 'int', array: true })
    likedCommentIDs: number[];

    @Field(() => [Number])
    @Column({ type: 'int', array: true })
    dislikedCommentIDs: number[];

    @OneToMany(() => Comment, comment => comment.student)
    comments: Comment[];
}
