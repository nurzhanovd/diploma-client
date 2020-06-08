import { gql } from 'apollo-boost';

export const QueryCategories = gql`
  query QueryCategories($suggestion: Boolean!, $default: Boolean!) {
    Node(filter: { root: true }) @include(if: $default) {
      title
      uuid
      description
      image
    }
    SuggestedRelatedNodes @include(if: $suggestion) {
      title
      uuid
      description
      image
    }
  }
`;
