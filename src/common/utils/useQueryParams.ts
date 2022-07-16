import { useLocation } from 'react-router'
import {parse, ParsedQuery} from 'query-string'

/**
 * useQueryParams hook
 * @example
 * let { get } = useQueryParams();
 */
export const useQueryParams = (): ParsedQuery =>
    parse(useLocation().search);
