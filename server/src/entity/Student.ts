import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Comment } from './Comment';

@Entity()
@ObjectType()
export class Student extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn()
    readonly ONID: string;

    @Field(() => [Comment])
    @OneToMany(() => Comment, comment => comment.student)
    comments: Comment[];
}
