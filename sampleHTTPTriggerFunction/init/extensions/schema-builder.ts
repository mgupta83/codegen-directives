import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema, mergeSchemas } from '@graphql-tools/schema';
import { resolvers } from '../../resolvers';
import { JsonFileLoader } from '@graphql-tools/json-file-loader';
import { makeExecutableSchema } from '@graphql-tools/schema';

import {upperDirective} from '../../directives/upper'
const {upperDirectiveTransformer, upperDirectiveTypeDefs} = upperDirective('upper')

const directiveSchema = makeExecutableSchema({
  typeDefs: [
    upperDirectiveTypeDefs
  ]
})


const schema = loadSchemaSync('./graphql.schema.json', {
  loaders: [new JsonFileLoader()],
});

const appSchema = addResolversToSchema(schema,resolvers)


let combinedSchema = mergeSchemas({
  schemas: [
    directiveSchema,
    appSchema,
  ]
});

combinedSchema = upperDirectiveTransformer(combinedSchema)

export { combinedSchema };