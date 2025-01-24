import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      name
      username
    }
  }
`;

export const LOG_IN = gql`
  mutation login($input: LogInInput!) {
    login(input: $input) {
      _id
      name
      username
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout {
      message
    }
  }
`;
