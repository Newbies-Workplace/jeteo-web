
export const getIdFromVanityUrl = (vanityUrl: string | undefined): string =>
    vanityUrl?.split('-')?.pop() ?? ''