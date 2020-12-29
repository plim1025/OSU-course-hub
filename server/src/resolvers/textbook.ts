import { Max, Min } from 'class-validator';
import {
    Arg,
    Field,
    ID,
    InputType,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from 'type-graphql';
import { Course } from '../entity/Course';
import { CourseTextbook } from '../entity/CourseTextbook';
import { Textbook } from '../entity/Textbook';
import { Error, Terms } from '../util';

@InputType()
class TextbookInput {
    @Field(() => ID)
    ISBN: string;

    @Field()
    title: string;

    @Field()
    author: string;

    @Field({ nullable: true })
    coverImageUrl?: string;

    @Field(() => Int)
    edition: number;

    @Field(() => Int)
    @Min(1000)
    @Max(9999)
    copyrightYear: number;

    @Field({ nullable: true })
    priceNewUSD?: number;

    @Field({ nullable: true })
    priceUsedUSD?: number;
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
    @Query(() => [Textbook])
    async getCourseTextbooks(@Arg('courseID') id: number): Promise<Textbook[]> {
        const textbooks = await CourseTextbook.find({ courseID: id });
        const textbookISBNs = textbooks.map(textbook => textbook.ISBN);
        return Textbook.findByIds(textbookISBNs);
    }

    @Mutation(() => TextbookResponse)
    async addTextbookToCourse(
        @Arg('input') input: TextbookInput,
        @Arg('courseID') courseID: number,
        @Arg('termUsed') termUsed: string,
        @Arg('yearUsed') yearUsed: number
    ): Promise<TextbookResponse> {
        if (Terms.indexOf(termUsed) === -1) {
            return {
                error: {
                    path: 'src/resolvers/textbook.ts',
                    message: `Invalid Term: ${termUsed}`,
                },
            };
        }
        if (yearUsed.toString().length !== 4) {
            return {
                error: {
                    path: 'src/resolvers/textbook.ts',
                    message: `Invalid Year: ${yearUsed}`,
                },
            };
        }
        const duplicateTextbook = await CourseTextbook.findOne({ courseID, ISBN: input.ISBN });
        if (duplicateTextbook) {
            return {
                error: {
                    path: 'src/resolvers/textbook.ts',
                    message: `Textbook with ISBN: ${input.ISBN} for course with ID: ${courseID} already exists`,
                },
            };
        }
        const course = await Course.findOne({ id: courseID });
        if (!course) {
            return {
                error: {
                    path: 'src/resolvers/textbook.ts',
                    message: `Could not find course with given ID: ${courseID}`,
                },
            };
        }
        let textbook = await Textbook.findOne({ ISBN: input.ISBN });
        if (!textbook) {
            textbook = await Textbook.create(input).save();
        }
        await CourseTextbook.create({
            courseID,
            ISBN: input.ISBN,
            termUsed,
            yearUsed,
        }).save();
        return { textbook };
    }
}
