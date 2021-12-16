// 类型兼容

interface Person1 {
  name: string;
}

class Dog {
  name!: string;
  age!: number;
}

// Dog的类型兼容Person1 因为检查到Dog里有和Person1相同的name类型 所以Dog可以分配给Person1
// 如果Dog里有其他的类型成员 则也不会报错 因为目标类型是Person1 只需要考虑Dog里是否有name就可以了 反之则会报错
const dog1: Person1 = new Dog();
