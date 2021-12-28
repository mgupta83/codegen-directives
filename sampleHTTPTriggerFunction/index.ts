import { HttpRequest, Context } from "@azure/functions";
import { ApolloServer } from "apollo-server-azure-functions";
import {combinedSchema} from './init/extensions/schema-builder'
import ApolloServerFunctions from "./ApolloServerFunctions";




// Provide the schema to the ApolloServer constructor
const server = new ApolloServer({schema: combinedSchema});


// CODE EXCEUTION @ API CALL
export default (context: Context, req: HttpRequest) => {
  return ApolloServerFunctions.graphqlHandler(server, context, req);
};

