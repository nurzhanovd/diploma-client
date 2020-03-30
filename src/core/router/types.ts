import { RouteProps as BaseRouteProps } from 'react-router';

export type RouteProps = BaseRouteProps & {
  path: string;
};
