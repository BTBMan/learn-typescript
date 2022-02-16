// 类型兼容

interface Person1 {
  name: string;
}

class Dog {
  name!: string;
  age!: number;
}

// Dog的类型兼容Person1 因为检查到Dog里有和Person1相同的name类型 所以Dog可以分配给Person1
// 如果Dog里有其他的类型成员 则也不会报错 因为源类型是Person1 只需要考虑目标成员Dog里是否有name就可以了 反之则会报错
const dog1: Person1 = new Dog();

// 函数参数兼容
let comFn1 = (a: number) => 0;
let comFn2 = (c: number, b: string) => 0;

// comFn1的类型兼容comFn2 因为comFn2的参数包涵的了comFn1的参数
comFn2 = comFn1;
// 报错 comFn2不兼容comFn1 因为comFn1的函数参数只有一个 而comFn2的参数比comFn的多 所以comFn2不匹配comFn1
// comFn1 = comFn2;

// 函数返回值兼容
let comFn3 = () => ({ name: 'john' });
let comFn4 = () => ({ name: 'john', age: 18 });

// 和第一种方式一下 只需要考虑返回值的类型里包不包涵comFn3的返回值类型
// comFn4有和comFn3相同的name类型 所以ok
comFn3 = comFn4;
// 反之comFn3中缺少类型age 所以comFn3不兼容comFn4
// comFn4 = comFn3

// function parameter bivariance
enum EventType {
  Mouse,
  Keyboard,
}
interface Event {
  timestamp: number;
}
interface MyMouseEvent extends Event {
  x: number;
  y: number;
}
interface MyKeyEvent extends Event {
  keyCode: number;
}
function listenEvent(eventType: EventType, handler: (n: Event) => void) {
  /* ... */
}
// error 因为这里的MyMouseEvent类型与Event类型不兼容 Event类型缺少了x和y的类型
// listenEvent(EventType.Mouse, (e: MyMouseEvent) => console.log(e.x + ',' + e.y));
// ok
listenEvent(EventType.Mouse, (e: Event) =>
  console.log((e as MyMouseEvent).x + ',' + (e as MyMouseEvent).y),
);
// ok as 操作符强制断言类型
listenEvent(EventType.Mouse, ((e: MyMouseEvent) => console.log(e.x + ',' + e.y)) as (
  e: Event,
) => void);
// number类型与Event类型不兼容
// listenEvent(EventType.Mouse, (e: number) => console.log(e));

// function rest parameter
function comFn5(arr: number[], cb: (...args: any[]) => void) {}

// ok 类型兼容
comFn5([1, 2], (a, b, c) => {});

// ok 类型兼容 可选的参数一定要在必选参数的后面
comFn5([1, 2], (a?, b?, c?) => {});

// 函数重载
// 函数重载要确保源类型上的每个重载要与目标类型兼容

// 枚举 枚举与数字 数字与枚举都兼容 要建立在相同的枚举下才可以 不同的枚举互不兼容
enum Enum1 {
  First,
  Second,
}

enum Enum2 {
  Apple,
  Banana,
  pear,
}

let testEnum1 = Enum1.First;

// ok 相同的枚举
testEnum1 = Enum1.Second;

// error 不同枚举类型不兼容
// testEnum1 = Enum2.Apple;

// class 与interface相同 当对比时只对比实例成员 构造函数和和静态成员不影响兼容性 但是类中的私有成员和受保护成员会影响兼容性
class ComC1 {
  name!: string;
  constructor(name: string, age: number) {}
}

class ComC2 {
  name!: string;
  constructor(name: string) {}
}

let testComC1: ComC1;
let testComC2: ComC2;

// both ok
// testComC1 = testComC2
// testComC2 = testComC1

// 泛型
interface ComI1<T> {
  name: T;
}

let testCom1: ComI1<string>;
let testCom2: ComI1<number>;

// error testCom2与testCom1类型不兼容 泛型传的类型不同
// testCom1 = testCom2;

let testCom3 = function <T>(name: T) {};
let testCom4 = function <U>(name: U) {};

// 对于没有指定泛型的具体类型的 会用any代替为指定的类型
testCom3 = testCom4;
testCom4 = testCom3;

// topic
// 任何类型都可以分配给自己
// any和known是相同的 不同的在于known除了any外不可以分配任何类型
// known和never是相反的 任何类型都可以分配known never可以分配一切类型 但是没有类型可以分配给never
// void不可以分配任何类型 并且任何类型也不可以分配给void 当然在一定条件下(strictNullChecks)排除any known never undefined null
// strictNullChecks关闭 null和undefined类似与never 他们之间可以互相分配
// strictNullChecks开启 null和undefined类型void 除了any known never undefined void外 不能分配任何类型 任何类型也不可以分配null和undefined
// undefined总是可以分配给void

export {};
