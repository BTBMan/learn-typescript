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
