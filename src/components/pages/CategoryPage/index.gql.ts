import { gql } from 'apollo-boost';

export const Node = gql`
  fragment KeyValue on KeyValueContent {
    uuid
    key
    value
  }

  fragment SogData on SOG {
    uuid
    contents {
      ...KeyValue
    }
    fogs {
      contents {
        ...KeyValue
      }
    }
  }

  query Node($id: ID!) {
    SOG(uuid: $id) {
      ...SogData
      children {
        ...SogData
      }
    }
  }
`;
