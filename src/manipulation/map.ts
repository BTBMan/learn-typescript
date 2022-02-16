// map types

type Union = 'name' | 'age' | 'gender';

// in 用于遍历联合类型
type Test1 = {
  [K in Union]: string;
};

type T1 = {
  name: string;
  age: number;
};

// 把对象类型的key取出转为联合类型 并循环
type Test2 = {
  [P in keyof T1]: T1[P];
};

// as 用来re-map key
type Test3 = {
  [P in keyof T1 as `re-map`]: T1[P];
};

type Test4 = [boolean, string];

// 如果遍历的是一个元祖类型 则 P 是 number 类型
type Test5 = {
  [P in Test4]: P;
};

type Test6<T> = {
  [P in keyof T]: P;
};

type Test7 = Test6<[1, 2, 3]>;

export {};
