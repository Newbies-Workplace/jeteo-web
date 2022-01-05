import { useLocation } from 'react-router'

/**
 * useQuery hook
 * @example
 * let query = useQuery();
 * query.get("name")
 */
export const useQuery = (): URLSearchParams =>
    new URLSearchParams(useLocation().search);
