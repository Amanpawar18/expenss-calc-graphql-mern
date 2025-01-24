import { gql } from "@apollo/client";

export const CREATE_TRANSACTIONS = gql`
  mutation createTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const UPDATE_TRANSACTIONS = gql`
  mutation updateTransaction($input: UpdateTransactionInput!) {
    updateTransaction(input: $input) {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const DELETE_TRANSACTIONS = gql`
  mutation deleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
