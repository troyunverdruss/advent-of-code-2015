declare module "itertools" {
  export function permutations<T>(
    iterable: Iterable<T>,
    r?: number
  ): Iterable<Array<T>>;
}
