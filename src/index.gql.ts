import { gql } from 'apollo-boost';

export const a = gql`
  query Test {
    FOG {
      uuid
    }
  }
`;
