// const 类型

const test1 = 'test1'; // 它的类型就是test1
let test2 = 'test2'; // 它的类型是string

// 由上面可以得出 用const声明的常量 他的类型就是你声明的常量
// 比如
const test3 = ['name', 'age', 'gender'] as const; // 数组则须要手动指定 as const
const test4 = {
  name: 'john',
  age: 18,
} as const; // 对象和数组的道理相同
