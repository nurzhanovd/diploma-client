import { gql } from 'apollo-boost';

export const fulfillNode = gql`
  mutation FulfillNode($uuid: ID!) {
    FulfillNode(uuid: $uuid)
  }
`;

export const queryNode = gql`
  fragment Payload on Node {
    uuid
    title
    isComplete
  }
  query Node($nodeId: ID!, $userId: ID!) {
    Node(uuid: $nodeId) {
      ...Payload
      neighbours {
        ...Payload
      }
      childes {
        ...Payload
      }
      parent {
        ...Payload
      }
    }

    IsNodeFulFilled(nodeId: $nodeId, userId: $userId)
  }
`;
