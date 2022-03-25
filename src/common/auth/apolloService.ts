import {ApolloClient, ApolloClientOptions, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

const APOLLO_CONFIG: ApolloClientOptions<NormalizedCacheObject> = {
    uri: `${process.env.API_URL}/graphql`,
    cache: new InMemoryCache(),
}

export const createApolloClient = (
    apolloConfig?: ApolloClientOptions<unknown>
): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({...apolloConfig, ...APOLLO_CONFIG});
}
