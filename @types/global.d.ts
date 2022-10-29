type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

type TMaybeAsync<T = void> = T | Promise<T>;

declare module '*.scss' {
  const content: Record<string, string>;
  export = content;
}

interface Window {
  env: Record<string, string>;
}
