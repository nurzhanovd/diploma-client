import { gql } from 'apollo-boost';

export const query = gql`
  query Search($searchString: String!) {
    Leaf(
      filter: { OR: [{ description_contains: $searchString }, { title_contains: $searchString }] }
    ) {
      isComplete
      title
      uuid
    }
  }
`;

export const addNewRoadMap = gql`
  mutation AddNewRoadMap($data: [RoadMapInput]) {
    CreateRoadMap(roadMap: $data)
  }
`;
