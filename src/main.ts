import { Elysia } from 'elysia'
import { yoga } from '@elysiajs/graphql-yoga'
import { createYoga, createSchema } from 'graphql-yoga'
import { getResolversFromSchema } from '@graphql-tools/utils'
import { neo4jDriver } from './neo4j/neo4j.config'
import { Neo4jGraphQL } from '@neo4j/graphql'
import { userTypeDefs } from './gql/User'
import { blogTypeDefs } from './gql/Blog'
import { postTypeDefs } from './gql/Post'
import { Neo4jScheme } from './neo4j/neo4j-config.interface';

const Neo4jScheme = process.env.NEO4J_SCHEME as Neo4jScheme || 'bolt' as Neo4jScheme
const Neo4jHost = process.env.NEO4J_HOST || 'localhost'
const Neo4jPort = Number.parseInt(process.env.NEO4J_PORT ?? '') || 7687

const neo4jInstance = `${Neo4jScheme}://${Neo4jHost}:${Neo4jPort}`;

const neoSchema = new Neo4jGraphQL({
    typeDefs: [
        userTypeDefs,
        blogTypeDefs,
        postTypeDefs
    ],
    driver: neo4jDriver(neo4jInstance),
    config: {
        enableDebug: true
    },
})

const app = new Elysia()
    .use(
        yoga({
            yoga: createYoga({
                schema: createSchema({
                    typeDefs: await neoSchema.getExecutableSchema(),
                    resolvers: getResolversFromSchema(await neoSchema.getSchema())
                })
            })
        })
    )
    .listen(Number.parseInt(process.env.APP_PORT ?? '') || 8080)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
