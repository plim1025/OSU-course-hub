import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { CommentResolver } from './resolvers/comment';
import { CourseResolver } from './resolvers/course';
import { ProfessorResolver } from './resolvers/professor';
import { StudentResolver } from './resolvers/student';
import { TextbookResolver } from './resolvers/textbook';

const main = async () => {
    dotenv.config();
    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                CourseResolver,
                ProfessorResolver,
                StudentResolver,
                TextbookResolver,
                CommentResolver,
            ],
        }),
        context: ({ req, res }) => ({
            req,
            res,
        }),
    });

    const app = express();

    app.use(cors({ origin: process.env.CORS_ORIGIN }));

    apolloServer.applyMiddleware({ app });

    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
};

main().catch(err => console.log(err));
