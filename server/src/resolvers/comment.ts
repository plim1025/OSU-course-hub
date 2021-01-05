import { Max, MaxLength, Min } from 'class-validator';
import { Arg, Field, InputType, Int, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Comment } from '../entity/Comment';
import { Course } from '../entity/Course';
import { Professor } from '../entity/Professor';
import { Student } from '../entity/Student';
import { Campuses, Error, Grades, Tags } from '../util';

@InputType()
class CommentInput {
    @Field()
    @MaxLength(524)
    text: string;

    @Field(() => Int)
    @Min(1)
    @Max(10)
    difficulty: number;

    @Field(() => Int)
    @Min(1)
    @Max(10)
    quality: number;

    @Field()
    ONID: string;

    @Field({ nullable: true })
    professorID?: number;

    @Field({ nullable: true })
    courseID?: number;

    @Field({ nullable: true })
    campus?: string;

    @Field({ nullable: true })
    recommend?: boolean;

    @Field({ nullable: true })
    baccCore?: boolean;

    @Field({ nullable: true })
    gradeReceived?: string;

    @Field(() => [String])
    tags: string[];
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
    async comments(): Promise<Comment[]> {
        const comments = await Comment.find({});
        return comments.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    }

    @Query(() => [Comment])
    async courseComments(@Arg('courseID') id: number): Promise<Comment[]> {
        const comments = await Comment.find({});
        return comments
            .filter(comment => comment.courseID === id)
            .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    }

    @Query(() => [Comment])
    async professorComments(@Arg('professorID') id: number): Promise<Comment[]> {
        const comments = await Comment.find({});
        return comments
            .filter(comment => comment.professorID === id)
            .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    }

    @Query(() => [Comment])
    async studentComments(@Arg('ONID') ONID: string): Promise<Comment[]> {
        const comments = await Comment.find({});
        return comments
            .filter(comment => comment.ONID === ONID)
            .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    }

    @Mutation(() => CommentResponse)
    async createComment(
        @Arg('input')
        {
            text,
            difficulty,
            quality,
            ONID,
            professorID,
            courseID,
            campus,
            recommend,
            baccCore,
            gradeReceived,
            tags,
        }: CommentInput
    ): Promise<CommentResponse> {
        const student = await Student.findOne({ ONID });
        if (!student) {
            return {
                error: {
                    path: 'src/resolvers/comment.ts',
                    message: `Could not find student with given ONID: ${ONID}`,
                },
            };
        }
        if (campus && Campuses.indexOf(campus) === -1) {
            return {
                error: {
                    path: 'src/resolvers/comment.ts',
                    message: `Invalid campus: ${campus}`,
                },
            };
        }
        if (gradeReceived && Grades.indexOf(gradeReceived) === -1) {
            return {
                error: {
                    path: 'src/resolvers/comment.ts',
                    message: `Invalid grade: ${gradeReceived}`,
                },
            };
        }
        if (tags) {
            for (let i = 0; i < tags.length; i++) {
                if (Tags.indexOf(tags[i]) === -1) {
                    return {
                        error: {
                            path: 'src/resolvers/comment.ts',
                            message: `Invalid tag: ${tags[i]}`,
                        },
                    };
                }
            }
        }
        if (professorID) {
            const professor = await Professor.find({ id: professorID });
            if (professor) {
                const comment = await Comment.create({
                    text,
                    difficulty,
                    quality,
                    ONID,
                    professorID,
                    campus,
                    recommend,
                    baccCore,
                    gradeReceived,
                    tags,
                    likes: 0,
                    dislikes: 0,
                }).save();
                return { comment };
            }
            return {
                error: {
                    path: 'src/resolvers/comment.ts',
                    message: `Could not find professor with given ID: ${professorID}`,
                },
            };
        }
        const course = await Course.find({ id: courseID });
        if (course) {
            const comment = await Comment.create({
                text,
                difficulty,
                quality,
                ONID,
                courseID,
                campus,
                recommend,
                baccCore,
                gradeReceived,
                tags,
                likes: 0,
                dislikes: 0,
            }).save();
            return { comment };
        }
        return {
            error: {
                path: 'src/resolvers/comment.ts',
                message: `Could not find course with given ID: ${courseID}`,
            },
        };
    }

    @Mutation(() => Boolean)
    async deleteComment(@Arg('id') id: number): Promise<boolean> {
        await Comment.delete({ id });
        return true;
    }

    @Mutation(() => CommentResponse)
    async upvote(@Arg('id') id: number): Promise<CommentResponse> {
        let comment = await Comment.findOne({ id });

        if (comment) {
            comment.likes += 1;
            await comment.save();
            return { comment };
        } else {
            return {
                error: {
                    path: 'src/resolvers/comment.ts',
                    message: `Could not find comment with given ID: ${id}`,
                },
            };
        }
    }

    @Mutation(() => CommentResponse)
    async downvote(@Arg('id') id: number): Promise<CommentResponse> {
        let comment = await Comment.findOne({ id });

        if (comment) {
            comment.dislikes += 1;
            await comment.save();
            return { comment };
        } else {
            return {
                error: {
                    path: 'src/resolvers/comment.ts',
                    message: `Could not find comment with given ID: ${id}`,
                },
            };
        }
    }
}
