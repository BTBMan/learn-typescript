// 索引 索引取类型

type Person = {
  name: string;
  age: number;
};

type Test1 = Person[keyof Person]; // string | number

type Test2 = Person['name']; // string

// number索引 把元祖类型的每项取出 转换为联合类型

type Tuple = [string, number];

type TupleUnion = Tuple[number];

export {};
