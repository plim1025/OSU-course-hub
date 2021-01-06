import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './Course';
import { Professor } from './Professor';
import { Student } from './Student';

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    text: string;

    @Field(() => Int)
    @Column()
    difficulty: number;

    @Field(() => Int)
    @Column()
    quality: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    ONID: string;

    @ManyToOne(() => Student)
    student: Student;

    @Field({ nullable: true })
    @Column({ nullable: true })
    courseID?: number;

    @ManyToOne(() => Course)
    course: Course;

    @Field({ nullable: true })
    @Column({ nullable: true })
    professorID?: number;

    @ManyToOne(() => Professor)
    professor: Professor;

    @Field({ nullable: true })
    @Column({ nullable: true })
    campus?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    recommend?: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    baccCore?: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    gradeReceived?: string;

    @Field(() => [String])
    @Column({ type: 'text', array: true })
    tags: string[] = [];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column()
    likes: number;

    @Field()
    @Column()
    dislikes: number;
}
