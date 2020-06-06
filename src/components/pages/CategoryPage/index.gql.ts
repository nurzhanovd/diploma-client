import { gql } from 'apollo-boost';

export const TreeNode = gql`
  query TreeNode($id: ID!) {
    TreeNode(uuid: $id) {
      nodes {
        title
        uuid
      }
      rels {
        from
        to
      }
    }

    GetCompletedNodes(nodeId: $id) {
      uuid
    }
  }
`;
