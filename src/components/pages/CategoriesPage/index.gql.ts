import { gql } from 'apollo-boost';

export const QueryCategories = gql`
  fragment ContentFragment on KeyValueContent {
    uuid
    key
    value
    type
  }

  fragment SOGFragment on SOG {
    uuid
    contents {
      ...ContentFragment
    }
    children {
      uuid
      contents {
        ...ContentFragment
      }
    }
  }

  query Courses {
    SOG(filter: { contents_some: { key: "hierarchy", value: "0" } }) {
      ...SOGFragment
    }
  }
`;
