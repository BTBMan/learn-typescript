// keyof用于把对象类型的key取出来 生成一个联合类型

type Person = {
  name: string;
  age: number;
};

type Test1 = keyof Person; // name | age

const test1: Test1 = 'age';
