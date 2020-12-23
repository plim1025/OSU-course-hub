import { Arg, Field, InputType, ObjectType, Query, Resolver } from 'type-graphql';
import { Course } from '../entity/Course';
import { Error } from '../util';
import { Comment } from '../entity/Comment';

@InputType()
class CommentInput {}

@ObjectType()
class CommentResponse {
    @Field(() => Error, { nullable: true })
    error?: Error;

    @Field(() => Course, { nullable: true })
    course?: Course;
}

@Resolver()
export class CommentResolver {
    @Query(() => [Comment])
    async courseComments(@Arg('courseID') id: number): Promise<Comment[]> {
        const comments = await Comment.find({});
        return comments.filter(comment => comment.course.id === id);
    }

    // @Query(() => CommentResolver)
    // async course(@Arg('courseID') id: number): Promise<CourseResponse> {
    //     const course = await Course.findOne({ id });
    //     if (course) {
    //         return { course };
    //     }
    //     return {
    //         error: {
    //             path: 'src/resolvers/course.ts',
    //             message: 'Could not find course with given ID',
    //         },
    //     };
    // }
}
