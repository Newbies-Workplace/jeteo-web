import { useLocation } from 'react-router'

/**
 * useQueryParams hook
 * @example
 * let query = useQueryParams();
 * query.get("name")
 */
export const useQueryParams = (): URLSearchParams =>
    new URLSearchParams(useLocation().search);
