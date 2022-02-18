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

type Test5 = {
  [P in keyof Test4]: Test4[P];
};

// 如果遍历的是一个元祖类型 则得到的是数组的下标以及数组中的方法key
type Test8 = keyof Test4;

const a: Test8 = 'concat';

type Test6<T> = {
  [P in keyof T]: P;
};

// 如果我们再次遍历我们的keyof Test4, 也就是Test8, 是我们拿到数组中的方法的key
// 在得到对应key的value类型 以下标为例 key=0 对应的Test["0"] = boolean
// 所以返回的类型就是 { 0: boolean, 1: string }
// 这样number为key的也可以用于数组 因为数组就是用下标取值 这和对象用key取值的方式是一样的
type Test11 = Test4['0']; // boolean
type Test9 = {
  [P in Test8]: Test4[P];
};

const b: Test9 = [true, ''];

type Test10 = keyof Test8;

const c: Test10 = 'toString';

type Test12 = {
  '0': boolean;
  '1': string;
};

const d: Test12 = {
  0: true,
  '1': '',
};

const e: Test12 = [true, ''];

type Test7 = Test6<[1, 2, 3]>;

export {};
