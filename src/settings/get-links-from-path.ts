import { MapRelativePathsToAbsolute, RelativePaths } from './path-types';

export function getLinksFromPaths<T extends RelativePaths = RelativePaths>(
  paths: T,
  prefix = '',
): MapRelativePathsToAbsolute<T> {
  return Object.entries(paths).reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      if (value === '/') {
        return {
          ...acc,
          [key]: '/',
        };
      }
      return {
        ...acc,
        [key]: key === 'index' ? prefix : `${prefix}/${value}`,
      };
    }
    return {
      ...acc,
      [key]: getLinksFromPaths(value, `${prefix}/${value.index}`),
    };
  }, {} as MapRelativePathsToAbsolute<T>);
}
