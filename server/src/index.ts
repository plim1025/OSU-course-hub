import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema, Resolver, Query } from 'type-graphql';
import dotenv from 'dotenv';

@Resolver()
class HelloResolver {
    @Query(() => String)
    async helloWorld() {
        return 'Hello World!';
    }
}

const main = async () => {
    dotenv.config();

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
