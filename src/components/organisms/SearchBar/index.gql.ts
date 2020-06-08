import { gql } from 'apollo-boost';

export const fetchQuery = gql`
  query SearchBar($text: String!) {
    Leaf(filter: { OR: [{ description_contains: $text }, { title_contains: $text }] }, first: 15) {
      uuid
      title
    }

    Branch(filter: { OR: [{ description_contains: $text }, { title_contains: $text }] }, first: 15) {
      uuid
      title
    }
  }
`;
