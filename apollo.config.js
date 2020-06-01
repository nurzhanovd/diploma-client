module.exports = {
  client: {
    localSchemaFile: 'schema.graphql',
    excludes: 'schema.graphql',
    includes: '**/*.gql.ts',
    service: {
      url: 'https://api-kf.arpanetus.com/graphql',
    },
  },
};
