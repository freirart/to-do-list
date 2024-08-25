export const isFilledArray = <T>(val: T) =>
  Array.isArray(val) && Boolean(val.length);
