// 类

// 这是一个泛型类
class Base1<T = string> {
  gender!: string;
  height: number = 200;
  len: number = 12;
  protected a: string = 'a'; // 受保护的类型只能在该类和子类当中访问
  private b: string = 'b'; // 私有成员只能在改类当中使用 子类不可以使用
  #c: string = 'c'; // 比私有还有私有的属性
  static d: string = 'd'; // 静态成员 只可以通过类来访问 也可以在前面添加修饰符 静态成员名称不可以是函数原型上的属性
  e?: T;
  // static f: T; // error 静态成员永远不能引用类的泛型

  // static块 可以在初始化的时候执行 不会泄漏变量 并且可以访问内部的所有成员
  static {
    console.log(111, this.d);
  }

  getHeight() {
    console.log(this.height + 'tall');

    console.log(this.#c); // ok
  }
}

class C1 extends Base1 {
  // [s: string]: string; // 可以声明索引签名
  name!: string; // !代表一定会有这个值 即使不再constructor里定义
  readonly age?: number; // 只读 外部不可更改
  public len: number = 0; // 公开属性

  // constructor可以重载
  constructor(name: string, age: number);
  constructor(gender: string);
  constructor(nameOrGender: string, age?: number) {
    super(); // 如果继承了一个类 那么必须要调用super()

    this.age = age;

    console.log(this.a); // 可以访问受保护的类型

    // console.log(this.b); // error 不可访问私有的类型
    console.log(this['b']); // 这样访问受私有的类型不会报错

    // 以下两种方法访问#符号的私有类型都会报错
    // console.log(this.#c);
    // console.log(this['#c']);

    // console.log(this.d); // 访问静态成员错误
    console.log(C1.d); // 可以这样访问静态成员
  }

  // 当被继承的类中的方法被当前类中的方法覆盖 可以使用super调用被继承类中的方法 但要保证类型约束是一致的
  getHeight(height?: number) {
    if (!height) {
      super.getHeight();
    } else {
      console.log(height + 'tall');
    }
    // return this.getHeight();
  }

  // 可以用箭头函数代替普通函数 防止this调用出错
  getHeight2 = () => {
    console.log('I am getHeight2!!!', this.height, this);
  };

  get length() {
    return this.len;
  }

  // 如果没有指定参数的类型 则默认根据getter的返回类型进行推断
  set length(value) {
    this.len = value;
  }
}

const testC1 = new C1('john', 18);

console.log(testC1.length);
console.log(testC1.height); // 可以使用继承的类中的属性和方法
console.log(testC1.age); // 根据js的执行过程 这里的age会显示18

// console.log(testC1.d); // 访问静态成员错误
console.log(C1.d); // 这个的方式可以访问到静态成员
// console.log(testC1.a); // 不可访问受保护的类型
// testC1.length = 23; // 如果没有setter的话 那默认为readonly类型

// testC1.age = 2; // 报错 不可更改readonly类型成员

const med1 = testC1.getHeight;
const med2 = testC1.getHeight2;
// med1(); // error this调用错误
// med2();
// testC1.getHeight2();

// implements 继承接口
interface IC1 {
  code: string;
}

class C2 implements IC1 {
  code: string = 'qq';
}
