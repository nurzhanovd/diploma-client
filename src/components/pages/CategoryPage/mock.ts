import { Payload } from 'components/organisms/ExpandableCourse';

export default [
  {
    root: 1,
    data: {
      1: {
        id: 1,
        title: 'Frontend',
        childes: [2, 3],
      },
      2: {
        id: 2,
        parentId: 1,
        title: 'Javascript',
        childes: [],
      },
      3: {
        id: 3,
        parentId: 1,
        title: 'CSS',
        childes: [4],
      },
      4: {
        id: 4,
        parentId: 3,
        title: 'SQL',
        childes: [22],
      },
      22: {
        id: 22,
        parentId: 4,
        title: 'Relational Algebra',
        childes: [],
      },
    },
  },
  {
    root: 5,
    data: {
      5: {
        id: 5,
        title: 'Backend',
        childes: [6, 7],
      },
      6: {
        id: 6,
        parentId: 5,
        title: 'Networking',
        childes: [],
      },
      7: {
        id: 7,
        parentId: 5,
        title: 'SQL',
        childes: [8],
      },
      8: {
        id: 8,
        parentId: 7,
        title: 'Relational Algebra',
        childes: [],
      },
    },
  },
] as Payload[];
