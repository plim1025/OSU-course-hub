import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';
import { buildSchema, Query, Resolver } from 'type-graphql';
import { createConnection } from 'typeorm';

@Resolver()
class HelloResolver {
    @Query(() => String)
    async helloWorld() {
        return 'Hello World!';
    }
}

const main = async () => {
    dotenv.config();
    const connection = await createConnection();

    const schema = await buildSchema({
        resolvers: [HelloResolver],
    });

    const apolloServer = new ApolloServer({ schema });

    const app = express();

    apolloServer.applyMiddleware({ app });

    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
};

main();
