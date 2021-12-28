import { Resolvers } from '../../generated';

export default {
    Query: {
        hello: async (root, args, context, info) => {
            return 'Hello World!'
        }
    }
} as Resolvers;