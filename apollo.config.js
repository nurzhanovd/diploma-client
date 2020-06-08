module.exports = {
  client: {
    localSchemaFile: 'schema.graphql',
    excludes: 'schema.graphql',
    includes: '**/*.gql.ts',
    service: {
      url: 'https://api.knowledge-forest.space/graphql',
      headers: {
        authorization: 'Bearer ZOWI',
      },
    },
  },
};
