// 条件类型 extends 当extends左边的类型可以赋值给右边类型的时候 则返回第一个条件 否则返回最后一个条件

type Person = {
  name: string;
  age: number;
};

type Test1<T> = T extends { name: string } ? true : false;

let test1: Test1<Person>; // true

let test2: Test1<{ age: number }>; // false

// infer 类型推断

type ArrayItem<T> = T extends Array<infer item> ? item : T;

type Test2 = ArrayItem<string>; // 类型string不可赋值给Array类型 所以返回类型本身
type Test3 = ArrayItem<[string, number, boolean]>; // 可以赋值给Array类型 并返回infer推断出的数组中的每一项类型 string number boolean

// 基于infer实现函数的返回类型
type MyReturnType<T> = T extends (...arys: never[]) => infer R ? R : never;

type Test4 = MyReturnType<() => number>;
type Test5 = MyReturnType<() => string>;
type Test6 = MyReturnType<[string, number]>;

// 分配条件类型
type ToArray<T> = T extends any ? T[] : never;
type ToArrayUnion<T> = [T] extends [any] ? T[] : never;

type Test7 = ToArray<string | number>; // string[] | number[]
type Test8 = ToArrayUnion<string | number>; // (string | number)[]

export {};
