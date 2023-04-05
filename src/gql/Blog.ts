import { gql } from "graphql-tag";

export const blogTypeDefs = gql`
    type Blog {
        id: ID! @id
        name: String!
        creator: User! @relationship(type: "HAS_BLOG", direction: IN)
        authors: [User!]! @relationship(type: "CAN_POST", direction: IN)
        posts: [Post!]! @relationship(type: "HAS_POST", direction: OUT)
        isCreator: Boolean
            @cypher(
                statement: """
                OPTIONAL MATCH (this)<-[:HAS_BLOG]-(creator:User {id: $auth.jwt.sub})
                WITH creator IS NOT NULL AS isCreator
                RETURN isCreator
                """
            )
        isAuthor: Boolean
            @cypher(
                statement: """
                OPTIONAL MATCH (this)<-[:CAN_POST]-(author:User {id: $auth.jwt.sub})
                WITH author IS NOT NULL AS isAuthor
                RETURN isAuthor
                """
            )
        createdAt: DateTime @timestamp(operations: [CREATE])
        updatedAt: DateTime @timestamp(operations: [UPDATE])
    }
`;