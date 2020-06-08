module.exports = {
  client: {
    localSchemaFile: 'schema.graphql',
    excludes: 'schema.graphql',
    includes: '**/*.gql.ts',
    service: {
      url: 'http://localhost:4002/graphql',
      headers: {
        authorization: 'Bearer ZOWI',
      },
    },
  },
};
