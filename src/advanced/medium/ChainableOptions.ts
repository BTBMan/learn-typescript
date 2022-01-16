/*
  12 - Chainable Options
  -------
  by Anthony Fu (@antfu) #medium #application
  
  ### Question
  
  Chainable options are commonly used in Javascript. But when we switch to TypeScript, can you properly type it?
  
  In this challenge, you need to type an object or a class - whatever you like - to provide two function `option(key, value)` and `get()`. In `option`, you can extend the current config type by the given key and value. We should about to access the final result via `get`.
  
  For example
  
  ```ts
  declare const config: Chainable
  
  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()
  
  // expect the type of result to be:
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```
  
  You don't need to write any js/ts logic to handle the problem - just in type level. 
  
  You can assume that `key` only accepts `string` and the `value` can be anything - just leave it as-is. Same `key` won't be passed twice.
  
  > View on GitHub: https://tsch.js.org/12
*/

/* _____________ Your Code Here _____________ */

// type Chainable = {
//   option(
//     key: string,
//     value: any,
//   ): {
//     option: Chainable['option'];
//     get: Chainable['get'];
//     key: typeof value;
//   };
//   get(): {
//     Chainable: string;
//     a: Chainable['option'];
//   };
// };
// 1. 首先给 Chainable 一个默认的泛型 用来存储每次调用options传入的数据
// 2. 将 options 变为一个泛型 这样才能推断出传过来的 value 的数据类型
// 3. options 返回当前的泛型 并把传递过来的 key 和 value 做为映射 加上之前的 M (作为交叉类型)传给 Chainable 的泛型
// 4. 这样在调用 get 方法的时候 正好把当面的 M 泛型返回既可了
type Chainable<M extends {} = {}> = {
  option<K extends string, V>(key: K, value: V): Chainable<{ [P in K]: V } & M>;
  get(): M;
};

/* _____________ Test Cases _____________ */
import { Alike, Expect } from '@type-challenges/utils';

declare const a: Chainable;

const result = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get();

const r = a.option('a', 1).option('b', 2).get();

type Test1 = typeof r;

type cases = [Expect<Alike<typeof result, Expected>>];

type Expected = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/12/answer
  > View solutions: https://tsch.js.org/12/solutions
  > More Challenges: https://tsch.js.org
*/
