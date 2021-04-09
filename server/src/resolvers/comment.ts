import { UserInputError } from 'apollo-server-express';
import { Max, MaxLength, Min } from 'class-validator';
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Comment } from '../entity/Comment';
import { Course } from '../entity/Course';
import { Professor } from '../entity/Professor';
import { Student } from '../entity/Student';
import { Campuses, Grades, Tags } from '../util';

@InputType()
class CommentInput {
    @Field({ nullable: true })
    anonymous?: boolean;

    @Field()
    @MaxLength(524)
    text: string;

    @Field(() => Int)
    @Min(1)
    @Max(5)
    difficulty: number;

    @Field(() => Int)
    @Min(1)
    @Max(5)
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

    @Mutation(() => Comment)
    async createComment(
        @Arg('input')
        {
            anonymous,
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
    ): Promise<Comment> {
        const student = await Student.findOne({ ONID });
        const validationErrors: any = {};
        if (!student) {
            validationErrors.student = `Could not find student with given ONID: ${ONID}`;
        }
        if (campus && Campuses.indexOf(campus) === -1) {
            validationErrors.campus = `Invalid campus: ${campus}`;
        }
        if (gradeReceived && Grades.indexOf(gradeReceived) === -1) {
            validationErrors.gradeReceived = `Invalid grade: ${gradeReceived}`;
        }
        if (tags) {
            for (let i = 0; i < tags.length; i++) {
                if (Tags.indexOf(tags[i]) === -1) {
                    validationErrors.tag = `Invalid tag: ${tags[i]}`;
                }
            }
        }
        if (professorID) {
            const professor = await Professor.find({ id: professorID });
            if (professor) {
                const comment = await Comment.create({
                    anonymous,
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
                return comment;
            }
            validationErrors.professor = `Could not find professor with given ID: ${professorID}`;
        }
        const course = await Course.find({ id: courseID });
        if (course) {
            const comment = await Comment.create({
                anonymous,
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
            return comment;
        }
        validationErrors.course = `Could not find course with given ID: ${courseID}`;
        throw new UserInputError('Validation error(s)', validationErrors);
    }

    @Mutation(() => Boolean)
    async deleteComment(@Arg('commentID') id: number): Promise<boolean> {
        const comment = await Comment.find({ id });
        if (comment) {
            await Comment.delete({ id });
            return true;
        }
        throw new UserInputError('Validation error(s)', {
            validationErrors: { course: `Could not find comment with given ID: ${id}` },
        });
    }
}
