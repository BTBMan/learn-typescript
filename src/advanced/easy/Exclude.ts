/*
  43 - Exclude
  -------
  by Zheeeng (@zheeeng) #easy #built-in
  
  ### Question
  
  Implement the built-in Exclude<T, U>
  > Exclude from T those types that are assignable to U
  
  > View on GitHub: https://tsch.js.org/43
*/

/* _____________ Your Code Here _____________ */

// 如果是联合类型的话 extends会逐个判断每一项
// 在这个例子当中 如果是一样的话 返回never 则不会在最终的结果里返回 否则就吧T在返回出去
type MyExclude<T, U> = T extends U ? never : T;

type Test1 = MyExclude<'a' | 'b' | 'c', 'a'>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, Exclude<'a' | 'b' | 'c', 'a'>>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, Exclude<'a' | 'b' | 'c', 'a' | 'b'>>>,
  Expect<
    Equal<
      MyExclude<string | number | (() => void), Function>,
      Exclude<string | number | (() => void), Function>
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/43/answer
  > View solutions: https://tsch.js.org/43/solutions
  > More Challenges: https://tsch.js.org
*/
