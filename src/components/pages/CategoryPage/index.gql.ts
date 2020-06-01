import { gql } from 'apollo-boost';

export const RST = gql`
  query RST($id: ID!) {
    RecursiveSOGTree(uuid: $id) {
      nodes {
        type
        uuid
      }
      nodeRels {
        from
        to
      }
      nodeContents {
        uuid
        type
        value
        key
        order
      }
      nodeContentRels {
        from
        to
      }
    }
  }
`;
