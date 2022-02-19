/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #medium #array #built-in
  
  ### Question
  
  Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.
  
  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });
  
  // expected to be `Promise<[number, number, string]>`
  const p = Promise.all([promise1, promise2, promise3] as const)
  ```
  
  > View on GitHub: https://tsch.js.org/20
*/

/* _____________ Your Code Here _____________ */

// declare function PromiseAll<T>(values: T): Promise<T>;
// declare function PromiseAll<T>(values: T): T;
declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T],
): Promise<{ [k in keyof T]: T[k] extends Promise<infer R> ? R : T[k] }>;

type Test1<T> = T;

type Test3<T> = {
  [K in keyof T]: K;
};

type Test2 = Test3<[1, 2, 3]>;

// 这里的两个参数的类型是不一样的
// 第一种给定的是元祖行为
// 第二种给定的是数组行为
declare function fn1<T extends any[]>(val: [...T]): T;
declare function fn2<T extends any[]>(val: T): T;

const t1 = fn1([1, 2, 3]);
const t2 = fn2([1, 2, 3]);

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/20/answer
  > View solutions: https://tsch.js.org/20/solutions
  > More Challenges: https://tsch.js.org
*/
