import { UserInputError } from 'apollo-server-express';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Comment } from '../entity/Comment';
import { Student } from '../entity/Student';

@Resolver()
export class StudentResolver {
    @Query(() => [Student])
    async students(): Promise<Student[]> {
        return Student.find({});
    }

    @Query(() => Student)
    async student(@Arg('ONID') ONID: string): Promise<Student> {
        const student = await Student.findOne({ ONID });
        if (student) {
            return student;
        }
        throw new UserInputError('Validation error(s)', {
            validationErrors: { course: `Could not find student with given ONID: ${ONID}` },
        });
    }

    @Mutation(() => Student)
    async createStudent(@Arg('ONID') ONID: string): Promise<Student> {
        const duplicateStudent = await Student.findOne({ ONID });
        if (duplicateStudent) {
            throw new UserInputError('Validation error(s)', {
                validationErrors: { course: `Student with ONID: ${ONID} already exists` },
            });
        }
        const student = await Student.create({
            ONID,
            likedCommentIDs: [],
            dislikedCommentIDs: [],
        }).save();
        return student;
    }

    @Mutation(() => Student)
    async likeComment(
        @Arg('ONID') ONID: string,
        @Arg('commentID') commentID: number
    ): Promise<Student> {
        const student = await Student.findOne({ ONID });
        const comment = await Comment.findOne({ id: commentID });
        if (student) {
            if (comment) {
                const idx1 = student.likedCommentIDs.indexOf(commentID);
                if (idx1 !== -1) {
                    student.likedCommentIDs.splice(idx1);
                    comment.likes -= 1;
                } else {
                    student.likedCommentIDs.push(commentID);
                    comment.likes += 1;
                }
                const idx2 = student.dislikedCommentIDs.indexOf(commentID);
                if (idx2 !== -1) {
                    student.dislikedCommentIDs.splice(idx2);
                    comment.dislikes -= 1;
                }
                await comment.save();
                await student.save();
                return student;
            }
            throw new UserInputError('Validation error(s)', {
                validationErrors: {
                    course: `Could not find comment with given commentID: ${commentID}`,
                },
            });
        }
        throw new UserInputError('Validation error(s)', {
            validationErrors: { course: `Could not find student with given ONID: ${ONID}` },
        });
    }

    @Mutation(() => Student)
    async dislikeComment(
        @Arg('ONID') ONID: string,
        @Arg('commentID') commentID: number
    ): Promise<Student> {
        const student = await Student.findOne({ ONID });
        const comment = await Comment.findOne({ id: commentID });
        if (student) {
            if (comment) {
                const idx1 = student.dislikedCommentIDs.indexOf(commentID);
                if (idx1 !== -1) {
                    student.dislikedCommentIDs.splice(idx1);
                    comment.dislikes -= 1;
                } else {
                    student.dislikedCommentIDs.push(commentID);
                    comment.dislikes += 1;
                }

                const idx2 = student.likedCommentIDs.indexOf(commentID);
                if (idx2 !== -1) {
                    student.likedCommentIDs.splice(idx2);
                    comment.likes -= 1;
                }

                await comment.save();
                await student.save();
                return student;
            }
            throw new UserInputError('Validation error(s)', {
                validationErrors: {
                    course: `Could not find comment with given commentID: ${commentID}`,
                },
            });
        }
        throw new UserInputError('Validation error(s)', {
            validationErrors: { course: `Could not find student with given ONID: ${ONID}` },
        });
    }

    @Mutation(() => Boolean)
    async deleteStudent(@Arg('ONID') ONID: string): Promise<boolean> {
        const student = await Student.findOne({ ONID });
        if (student) {
            await Student.delete({ ONID });
            return true;
        }
        throw new UserInputError('Validation error(s)', {
            validationErrors: { course: `Could not find student with given ONID: ${ONID}` },
        });
    }
}
