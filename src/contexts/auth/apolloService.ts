import {ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

const GRAPHQL_URL = `${__GRAPHQL_URI__}/graphql`;

interface ApolloOptions {
    headers?: Record<string, string>
}

export const createApolloClient = (
    apolloConfig?: ApolloOptions
): ApolloClient<NormalizedCacheObject> => {

    const httpLink = createHttpLink({
        uri: GRAPHQL_URL,
    });

    const authMiddleware = new ApolloLink((operation, forward) => {
        operation.setContext(({ headers = {}, ...rest }) => ({
            ...rest,
            headers: {
                ...headers,
                ...apolloConfig?.headers,
            }
        }));

        return forward(operation);
    });

    return new ApolloClient({
        link: concat(authMiddleware, httpLink),
        cache: new InMemoryCache(),
    });
}
