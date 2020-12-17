import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { CourseResolver } from './resolvers/course';
import { StudentResolver } from './resolvers/student';

const main = async () => {
    dotenv.config();
    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [CourseResolver, StudentResolver],
        }),
        context: ({ req, res }) => ({
            req,
            res,
        }),
    });

    const app = express();

    apolloServer.applyMiddleware({ app });

    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
};

main().catch(err => console.log(err));
