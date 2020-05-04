import { gql } from 'apollo-boost';

export const query = gql`
  query FetchFogAndSog {
    FOG {
      uuid
    }
  }
`;
