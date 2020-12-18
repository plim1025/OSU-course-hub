import { Field, ID, Int, ObjectType, Root } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';

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

    @Field(() => [Int])
    @Column('int', { array: true })
    difficulty: number[] = [];

    @Field(() => Int, { nullable: true })
    averageDifficulty(@Root() parent: Professor): number | null {
        if (parent.difficulty.length) {
            return (
                Math.round(
                    (parent.difficulty.reduce((a, b) => a + b) / parent.difficulty.length) * 10
                ) / 10
            );
        }
        return null;
    }

    @Field(() => [Int])
    @Column('int', { array: true })
    quality: number[] = [];

    @Field(() => Int, { nullable: true })
    averageQuality(@Root() parent: Professor): number | null {
        if (parent.quality.length) {
            return (
                Math.round((parent.quality.reduce((a, b) => a + b) / parent.quality.length) * 10) /
                10
            );
        }
        return null;
    }

    @Field(() => [Comment])
    @OneToMany(() => Comment, comment => comment.professor)
    comments: Comment[];
}
