import { gql } from 'apollo-boost';

export const QueryCategories = gql`
  query QueryCategories {
    SOG(filter: { contents_some: { key: "hierarchy", value: "0" } }) {
      uuid
      contents {
        key
        value
      }
    }
  }
`;
