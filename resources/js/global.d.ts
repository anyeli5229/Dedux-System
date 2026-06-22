import { Config, RouteParam, RouteParamsWithQueryOverload } from 'ziggy-js';

declare global {
    interface Window {
        route: (
            name: any,
            params?: any,
            absolute?: boolean,
            config?: any
        ) => any;
    }
}