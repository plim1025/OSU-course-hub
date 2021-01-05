import { IsNumberString, Length } from 'class-validator';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Student } from '../entity/Student';
import { Comment } from '../entity/Comment';
import { Error } from '../util';

@InputType()
class StudentInput {
    @Field()
    @IsNumberString({ no_symbols: true }, { message: 'ONID must only contain numbers' })
    @Length(9, 9, { message: 'ONID must be of length 9' })
    ONID: string;
}

@ObjectType()
class StudentResponse {
    @Field(() => Error, { nullable: true })
    error?: Error;

    @Field(() => Student, { nullable: true })
    student?: Student;
}

@Resolver()
export class StudentResolver {
    @Query(() => [Student])
    async students(): Promise<Student[]> {
        return Student.find({});
    }

    @Query(() => StudentResponse)
    async student(@Arg('ONID') ONID: string): Promise<StudentResponse> {
        const student = await Student.findOne({ ONID });
        if (student) {
            return { student };
        }
        return {
            error: {
                path: 'src/resolvers/student.ts',
                message: `Could not find student with given ONID: ${ONID}`,
            },
        };
    }

    @Mutation(() => Student)
    async createStudent(@Arg('input') { ONID }: StudentInput): Promise<Student> {
        return Student.create({ ONID, likedComments: [], dislikedComments: [] }).save();
    }

    @Mutation(() => StudentResponse)
    async upvote(
        @Arg('ONID') { ONID }: StudentInput,
        @Arg('commentID') commentID: number
    ): Promise<StudentResponse> {
        const student = await Student.findOne({ ONID });
        const comment = await Comment.findOne({ id: commentID });
        if (student) {
            if (comment) {
                const idx1 = student.likedComments.indexOf(commentID);
                if (idx1 !== -1) {
                    student.likedComments.splice(idx1);
                    comment.likes -= 1;
                } else {
                    student.likedComments.push(commentID);
                    comment.likes += 1;
                }

                const idx2 = student.dislikedComments.indexOf(commentID);
                if (idx2 !== -1) {
                    student.dislikedComments.splice(idx2);
                    comment.dislikes -= 1;
                }

                await comment.save();
                await student.save();
                return { student };
            } else {
                return {
                    error: {
                        path: 'src/resolvers/student.ts',
                        message: `Could not find comment with given commentID: ${commentID}`,
                    },
                };
            }
        }
        return {
            error: {
                path: 'src/resolvers/student.ts',
                message: `Could not find student with given ONID: ${ONID}`,
            },
        };
    }

    @Mutation(() => StudentResponse)
    async downvote(
        @Arg('ONID') { ONID }: StudentInput,
        @Arg('commentID') commentID: number
    ): Promise<StudentResponse> {
        const student = await Student.findOne({ ONID });
        const comment = await Comment.findOne({ id: commentID });
        if (student) {
            if (comment) {
                const idx1 = student.dislikedComments.indexOf(commentID);
                if (idx1 !== -1) {
                    student.dislikedComments.splice(idx1);
                    comment.dislikes -= 1;
                } else {
                    student.dislikedComments.push(commentID);
                    comment.dislikes += 1;
                }

                const idx2 = student.likedComments.indexOf(commentID);
                if (idx2 !== -1) {
                    student.likedComments.splice(idx2);
                    comment.likes -= 1;
                }

                await comment.save();
                await student.save();
                return { student };
            } else {
                return {
                    error: {
                        path: 'src/resolvers/student.ts',
                        message: `Could not find comment with given commentID: ${commentID}`,
                    },
                };
            }
        }
        return {
            error: {
                path: 'src/resolvers/student.ts',
                message: `Could not find student with given ONID: ${ONID}`,
            },
        };
    }

    @Mutation(() => Boolean)
    async deleteStudent(@Arg('ONID') ONID: string): Promise<boolean> {
        await Student.delete({ ONID });
        return true;
    }
}
