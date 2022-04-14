import { useLocation } from 'react-router'

/**
 * useQuery hook
 * @example
 * let query = useQuery();
 * query.get("name")
 */
export const useQueryParams = (): URLSearchParams =>
    new URLSearchParams(useLocation().search);
