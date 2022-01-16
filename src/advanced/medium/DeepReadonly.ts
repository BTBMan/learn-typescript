/*
  9 - Deep Readonly
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys #deep
  
  ### Question
  
  Implement a generic `DeepReadonly<T>` which make every parameter of an object - and its sub-objects recursively - readonly.
  
  You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on are no need to take into consideration. However, you can still challenge your self by covering different cases as many as possible.
  
  For example
  
  ```ts
  type X = { 
    x: { 
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }
  
  type Expected = { 
    readonly x: { 
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey' 
  }
  
  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```
  
  > View on GitHub: https://tsch.js.org/9
*/

/* _____________ Your Code Here _____________ */

// type List = string | number | boolean | undefined | null | Function;

// type DeepReadonly<T> = {
//   readonly [P in keyof T]: T[P] extends List ? T[P] : DeepReadonly<T[P]>;
// };

// 2. is better
// 类型兼容当中对 never 描述的知识点
// 首先这里的 keyof T[K] 取当前K对应的值的所有key合集 如果他是一个普通的类型 那么他就不会和never匹配
// type DeepReadonly<T> = {
//   readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>;
// };
// type DeepReadonly<T> = {
//   // readonly [K in keyof T]: keyof T[K] extends never ? T[K] : false;
//   [K in keyof T]: never;
// };
// type DeepReadonly<T> = {
//   readonly [K in keyof T]: DeepReadonly<T[K]>;
// };

type Test3 = string extends never ? true : false;
type Test4 = keyof { a: 'a' } extends never ? true : false;

// 3. is better
// 这里首先判断是不是一个对象 key:xxx 如果是的话就递归他 不是的就返回现有的类型
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends { [key: string]: unknown } ? DeepReadonly<T[P]> : T[P];
};

// type DeepReadonly<T> = {
//   readonly [P in keyof T]: DeepReadonly<T[P]>;
// };

type Test1 = DeepReadonly<A>;
type Test5 = DeepReadonly<string>;

type Test6 = keyof string;
type Test7 = {
  [K in keyof string]: never;
};

// const a: Test7 = {};

const b: DeepReadonly<string> = '';

type Test2 = DeepReadonly<B>;

type cases2 = [
  Expect<
    Equal<
      Test2,
      {
        readonly c: string;
        readonly a: {
          readonly b: string;
        };
      }
    >
  >,
];

type B = {
  c: string;
  a: {
    b: string;
  };
};

type A = {
  a: string;
  b: boolean;
  e: 's';
  f: 1;
  g: () => 1;
  c: {
    d: number;
  };
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [Expect<Equal<DeepReadonly<X>, Expected>>];

type X = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: 'string';
        };
        k: 'hello';
      };
    };
  };
};

type Expected = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: 'string';
        };
        readonly k: 'hello';
      };
    };
  };
};

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9/answer
  > View solutions: https://tsch.js.org/9/solutions
  > More Challenges: https://tsch.js.org
*/
