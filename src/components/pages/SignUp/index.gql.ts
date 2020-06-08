import { gql } from 'apollo-boost';

export const query = gql`
  mutation SignUp(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    SignUp(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      token
      username
      email
      uuid
      errors {
        key
        value
      }
    }
  }
`;

export const mergeTags = gql`
  mutation MergeTags($tags: [String!]) {
    MergeUserWithTags(tags: $tags)
  }
`;

export const queryTags = gql`
  query QueryTags {
    Tag {
      uuid
      title
    }
  }
`;
