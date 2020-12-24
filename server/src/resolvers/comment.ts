import { MaxLength } from 'class-validator';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Comment } from '../entity/Comment';
import { Course } from '../entity/Course';
import { Professor } from '../entity/Professor';
import { Student } from '../entity/Student';
import { Error } from '../util';

@InputType()
class CommentInput {
    @Field()
    @MaxLength(524)
    text: string;

    @Field()
    ONID: string;

    @Field({ nullable: true })
    professorID?: number;

    @Field({ nullable: true })
    courseID?: number;
}

@ObjectType()
class CommentResponse {
    @Field(() => Error, { nullable: true })
    error?: Error;

    @Field(() => Comment, { nullable: true })
    comment?: Comment;
}

@Resolver()
export class CommentResolver {
    @Query(() => [Comment])
    async courseComments(@Arg('courseID') id: number): Promise<Comment[]> {
        const comments = await Comment.find({});
        return comments
            .filter(comment => comment.course.id === id)
            .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    }

    @Query(() => [Comment])
    async professorComments(@Arg('professorID') id: number): Promise<Comment[]> {
        const comments = await Comment.find({});
        return comments
            .filter(comment => comment.professor.id === id)
            .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    }

    @Query(() => [Comment])
    async studentComments(@Arg('ONID') ONID: string): Promise<Comment[]> {
        const comments = await Comment.find({});
        return comments
            .filter(comment => comment.student.ONID === ONID)
            .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    }

    @Mutation(() => CommentResponse)
    async createComment(
        @Arg('input') { text, ONID, professorID, courseID }: CommentInput
    ): Promise<CommentResponse> {
        const student = await Student.findOne({ ONID });
        if (!student) {
            return {
                error: {
                    path: 'src/resolvers/comment.ts',
                    message: 'Could not find student with given ONID',
                },
            };
        }
        if (professorID) {
            const professor = await Professor.find({ id: professorID });
            if (professor) {
                const comment = await Comment.create({ text, ONID, professorID }).save();
                return { comment };
            }
            return {
                error: {
                    path: 'src/resolvers/comment.ts',
                    message: 'Could not find professor with given ID',
                },
            };
        }
        const course = await Course.find({ id: courseID });
        if (course) {
            const comment = await Comment.create({ text, ONID, courseID }).save();
            return { comment };
        }
        return {
            error: {
                path: 'src/resolvers/comment.ts',
                message: 'Could not find course with given ID',
            },
        };
    }

    @Mutation(() => Boolean)
    async deleteComment(@Arg('id') id: number): Promise<boolean> {
        await Comment.delete({ id });
        return true;
    }
}
