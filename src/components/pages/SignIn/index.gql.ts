import { gql } from 'apollo-boost';

export const query = gql`
  mutation Login($login: String!, $password: String!) {
    SignIn(login: $login, password: $password) {
      token
      errors {
        key
        value
      }
      email
      username
      uuid
    }
  }
`;
