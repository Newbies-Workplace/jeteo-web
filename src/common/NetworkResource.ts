
export enum ResourceStatus {
    Pending,

    // every other state is treated as true
    // it's this way bc every other state/value
    // is already done request but with different result
    // any 'if' check on resource should be resolved in two ways
    // > resource is pending/loading (and placeholder should be displayed)
    // > resource is fetched with different results (valid or not valid one)
    NotFound,
    NotAuthorized,
    Error,
}

export type NetworkResource<T> = ResourceStatus | T
