import { gql } from "graphql-tag";

export const userTypeDefs = gql`
    type User {
        id: ID! @id
        email: String!
        createdBlogs: [Blog!]! @relationship(type: "HAS_BLOG", direction: OUT)
        authorsBlogs: [Blog!]! @relationship(type: "CAN_POST", direction: OUT)
        createdAt: DateTime @timestamp(operations: [CREATE])
        updatedAt: DateTime @timestamp(operations: [UPDATE])
    }
`;
