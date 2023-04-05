import neo4j, { Driver } from 'neo4j-driver';

const neo4jUsername = process.env.NEO4J_USERNAME || 'neo4j'
const neo4jPassword = process.env.NEO4J_PASSWORD || 'PASSWORD'

let neo4jDriverInstance: Driver;

export const neo4jDriver = (uri: string) => {
    if (neo4jDriverInstance) {
        // return Neo4j driver instance
        return neo4jDriverInstance;
    } else {
        // return a new Neo4j driver instance
        neo4jDriverInstance = neo4j.driver(
            uri,
            neo4j.auth.basic(
                neo4jUsername,
                neo4jPassword
            ),
            {
                logging: {
                    logger: console.log,
                    level: 'debug'
                }
            }
        );
        return neo4jDriverInstance;
    }
};
