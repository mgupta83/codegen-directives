import { defaultFieldResolver, GraphQLSchema } from "graphql"
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import _ from 'underscore'
import { ApolloError } from 'apollo-server-azure-functions'

// This function takes in a schema and adds upper-casing logic
// to every resolver for an object field that has a directive with
// the specified name (we're using `upper`)
function upperDirective(directiveName: string) {
  return{
  upperDirectiveTypeDefs: `directive @upper on FIELD_DEFINITION`,
  upperDirectiveTransformer: (schema: GraphQLSchema) => {
  return mapSchema(schema, {

    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {

      // Check whether this field has the specified directive
      const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (upperDirective) {

        // Get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig;

        // Replace the original resolver with a function that *first* calls
        // the original resolver, then converts its result to upper case
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          if (typeof result === 'string') {
            return result.toUpperCase();
          }
          return result;
        }
        return fieldConfig;
      }
    }
  })
}
}
}

export { upperDirective };