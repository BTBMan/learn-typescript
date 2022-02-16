// this

// 如果函数里须要this类型 则可以在参数中指定 当编译为js的时候 这个参数不会真实存在
function fn1(this: string) {
  console.log(this);
}

// this的类型
class C3 {
  name: string = '';

  // 返回的类型就是this
  get getThis() {
    return this;
  }

  // 也可以在参数中给定类型
  equal(con: this) {
    return con.name === this.name;
  }
}

// 如果是继承自C3的类呢
class C4 extends C3 {
  name2: string = '';
}

const testC3 = new C3();
console.log(testC3.getThis); // 返回的类型是C3

const testC4 = new C4();
console.log(testC4.getThis); // 返回的类型是C4

// console.log(testC4.equal(testC3)); // 报错 两个不匹配 因为缺少成员

// 基于this的类型守卫
class C5 {
  isC4(): this is C4 {
    return this instanceof C4;
  }
}

const testC5 = new C5();
console.log(testC5.isC4());

class Box<T> {
  value?: T;

  hasValue(): this is { value: T } {
    return this.value !== undefined;
  }
}

const box = new Box();
box.value = 'Gameboy';

console.log(box.hasValue());

export {};
