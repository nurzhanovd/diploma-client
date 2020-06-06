import { gql } from 'apollo-boost';

export const QueryCategories = gql`
  query QueryCategories {
    Node(filter: { root: true }) {
      title
      uuid
    }
  }
`;
