import { Course } from '../entity/Course';
import { Textbook } from '../entity/Textbook';
import { Arg, Mutation, Query, Resolver, Field, ObjectType } from 'type-graphql';
import { CourseTextbook } from '../entity/CourseTextbook';
import { Error, Terms } from '../util';

@ObjectType()
class CourseTextbookResponse {
    @Field(() => Error, { nullable: true })
    error?: Error;

    @Field(() => [CourseTextbook], { nullable: true })
    textbook?: CourseTextbook[];
}

@ObjectType()
class TextbookResponse {
    @Field(() => Error, { nullable: true })
    error?: Error;

    @Field(() => Textbook, { nullable: true })
    textbook?: Textbook;
}

@Resolver()
export class TextbookResolver {
    @Query(() => [CourseTextbook])
    async getTextbooks(): Promise<CourseTextbook[]> {
        return CourseTextbook.find({});
    }

    @Query(() => CourseTextbookResponse)
    async getTextbookByID(@Arg('id') id: number): Promise<CourseTextbookResponse> {
        const textbooks = await CourseTextbook.find({ courseID: id });

        if (textbooks) {
            return { textbook: textbooks };
        } else {
            return {
                error: {
                    path: 'src/resolvers/textbook.ts',
                    message: 'Could not find textbook with given ID',
                },
            };
        }
    }

    @Mutation(() => TextbookResponse)
    async addTextbookToCourse(
        @Arg('textbookID') textbookID: string,
        @Arg('courseID') courseID: number,
        @Arg('termUsed') termUsed: string,
        @Arg('yearUsed') yearUsed: number
    ): Promise<TextbookResponse> {
        if (Terms.indexOf(termUsed) === -1) {
            return {
                error: {
                    path: 'src/resolvers/textbook.ts',
                    message: 'Invalid Term',
                },
            };
        }

        if (yearUsed.toString().length !== 4) {
            return {
                error: {
                    path: 'src/resolvers/textbook.ts',
                    message: 'Invalid Year',
                },
            };
        }

        const course = await Course.findOne({ id: courseID });
        const textbook = await Textbook.findOne({ ISBN: textbookID });

        if (!course) {
            return {
                error: {
                    path: 'src/resolvers/textbook.ts',
                    message: 'Could not find course with given ID',
                },
            };
        }

        if (!textbook) {
            return {
                error: {
                    path: 'src/resolvers/textbook.ts',
                    message: 'Could not find textbook with given ID',
                },
            };
        }

        const duplicateTextbook = CourseTextbook.findOne({ courseID, ISBN: textbookID });
        if (duplicateTextbook) {
            return {
                error: {
                    path: 'src/resolvers/textbook.ts',
                    message: 'Textbook for the course already exists',
                },
            };
        }

        await CourseTextbook.create({
            courseID,
            ISBN: textbookID,
            termUsed,
            yearUsed,
        }).save();
        return { textbook };
    }
}
