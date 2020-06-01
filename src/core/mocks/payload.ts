import { Payload } from 'components/organisms/ExpandableCourse';

export const payload: Payload = {
  root: 1,
  data: {
    1: {
      id: 1,
      title: 'Computer Science',
      childes: [2, 5, 3, 4],
    },
    2: {
      id: 2,
      parentId: 1,
      title: 'Essentials',
      childes: [6, 7],
    },
    3: {
      id: 3,
      parentId: 1,
      title: 'Algorithms',
      childes: [8, 9],
    },
    4: {
      id: 4,
      parentId: 1,
      title: 'OOP',
      childes: [12, 13, 14],
    },
    5: {
      id: 5,
      parentId: 1,
      title: 'Functional Programming',
      childes: [15, 16, 17],
    },
    6: {
      id: 6,
      parentId: 2,
      title: 'What is Variable?',
      childes: [],
    },
    7: {
      id: 7,
      parentId: 2,
      title: 'Conditional Statements',
      childes: [],
    },
    8: {
      id: 8,
      parentId: 3,
      title: 'Analysis of Algorithms',
      childes: [],
    },
    9: {
      id: 9,
      parentId: 3,
      title: 'Sorting Algorithms',
      childes: [10, 11],
    },
    10: {
      id: 10,
      parentId: 9,
      title: 'Bubble Sort',
      childes: [],
    },
    11: {
      id: 11,
      parentId: 9,
      title: 'Merge Sort',
      childes: [],
    },
    12: {
      id: 12,
      parentId: 4,
      title: 'Encapsulation',
      childes: [],
    },
    13: {
      id: 13,
      parentId: 4,
      title: 'Inheritance',
      childes: [],
    },
    14: {
      id: 14,
      parentId: 4,
      title: 'Polymorphism',
      childes: [],
    },
    15: {
      id: 15,
      parentId: 5,
      title: 'Functional Purity',
      childes: [],
    },
    16: {
      id: 16,
      parentId: 5,
      title: 'Referential Transparency',
      childes: [],
    },
    17: {
      id: 17,
      parentId: 5,
      title: 'Partial Application',
      childes: [],
    },
  },
};
