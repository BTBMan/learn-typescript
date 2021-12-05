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
