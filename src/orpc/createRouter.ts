export function createRouter<
  T extends Record<
    string,
    { callable: () => unknown; actionable: () => unknown }
  >,
>(procedures: T) {
  return Object.fromEntries(
    Object.entries(procedures).flatMap(([key, procedure]) => [
      [key, procedure.callable()],
      [`${key}Action`, procedure.actionable()],
    ]),
  ) as {
    [K in keyof T]: ReturnType<T[K]["callable"]>;
  } & {
    [K in keyof T as `${string & K}Action`]: ReturnType<T[K]["actionable"]>;
  };
}
