import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
  query getAuthenticatedUser {
    authUser {
      _id
      username
      name
      profilePic
      gender
    }
  }
`;

export const USER_AND_TRANSACTIONS = gql`
  query getUserAndTransactions($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      username
      profilePic
      transactions {
        _id
        description
        paymentType
        category
        amount
        location
        date
      }
    }
  }
`;
