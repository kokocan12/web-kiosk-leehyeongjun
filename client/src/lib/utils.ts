export function invariant(condition: boolean, message: string) {
  if (condition) throw Error(message);
}

export function isPlainObject(something: any) {
  return !!something && Object.getPrototypeOf(something) === Object.prototype;
}
