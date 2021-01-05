import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';
import { CourseProfessor } from './CourseProfessor';

@Entity()
@ObjectType()
export class Professor extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    college: string;

    @OneToMany(() => Comment, comment => comment.professor)
    comments: Comment[];

    @OneToMany(() => CourseProfessor, courseProfessor => courseProfessor.professor)
    courseProfessor: CourseProfessor[];
}
