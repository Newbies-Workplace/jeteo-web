import { useLocation } from 'react-router'
import {parse, ParsedQuery} from 'query-string'

/**
 * useQueryParamsHook hook
 * @example
 * let { get } = useQueryParamsHook();
 */
export const useQueryParamsHook = (): ParsedQuery =>
    parse(useLocation().search);
