const userTypeDef = `
  #graphql

  # ! represents that field is manadatory
  type User {
    _id: ID!
    username: String!
    name: String!
    password: String!
    profilePic: String
    gender: String!
    transactions: [Transaction!]
  }

  type Query {
    # ! is used to mention that each user cannont be null
    # we won't be making User mandatory here as incase user is not authenticated
    # we will return null
    authUser: User
    user(userId:ID!): User
  }

  type Mutation {
    # input we are expecting
    # : User is mentioning we will sending user as response
    signUp(input: SignUpInput): User
    login(input: LogInInput): User
    logout: logOutResponse
  }

  input SignUpInput {
    username: String!
    name: String!
    password: String!
    gender: String!
  }

  input LogInInput {
    username: String!
    password: String!
  }

  type logOutResponse {
    message: String!
  }
`;

export default userTypeDef
