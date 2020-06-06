import { gql } from 'apollo-boost';

export const query = gql`
  query Search($searchString: String!, $rootId: ID!) {
    RoadMapSearch(searchString: $searchString, rootId: $rootId) {
      title
      uuid
    }
  }
`;
