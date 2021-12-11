// abstract 抽象类和成员
// 有些时候 我们须要的方法是一个抽象的 没有具体的实现 而这些方法必须在一个抽象类中
// 而抽象类是所有类的基类 本身不可以实例化 须要创建一个类去继承它

abstract class Base2 {
  abstract getName(): string;

  myName() {
    console.log('My name is' + this.getName());
  }
}

// const testB1 = new Base2(); // error 无法创建抽象类的实例

class C6 extends Base2 {
  getName(): string {
    return 'john';
  }
}

// 必须创建一个类去继承抽象类
const testC6 = new C6();
testC6.myName();
