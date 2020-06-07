module.exports = {
  client: {
    localSchemaFile: 'schema.graphql',
    excludes: 'schema.graphql',
    includes: '**/*.gql.ts',
    service: {
      url: 'api.knowledge-forest.space',
      headers: {
        authorization: 'Bearer ZOWI',
      },
    },
  },
};
