import { Textbook } from 'src/entity/Textbook';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CourseTextbook } from '../entity/CourseTextbook';

@Resolver()
export class TextbookResolver {
    @Query(() => [CourseTextbook])
    async getTextbooks(): Promise<CourseTextbook[]> {
        return CourseTextbook.find({});
    }

    @Query(() => [CourseTextbook])
    async getTextbookByID(@Arg('id') id: number): Promise<CourseTextbook[]> {
        return (await CourseTextbook.find({})).filter(textbook => {
            textbook.courseId === id;
        });
    }

    // @Mutation(() => Textbook)
    // async createCourseTextbook(
    //     @Arg('textbook') textbook: Textbook,
    //     @Arg('courseID') courseID: number
    // ): Promise<Textbook> {
    //     return CourseTextbook.create({ textbook, courseID }).save();
    // }
}
