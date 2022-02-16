// 装饰器
// 装饰器可以附加到类,方法,访问器,属性,参数上 以@xxx的形式 表达式必须为一个计算函数 在运行时调用

import 'reflect-metadata';

function ClassD(c: any) {
  console.log('class', c); // 此时的c就是被装饰的class构造器

  return class extends c {};
}

function sayD(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('method', target, propertyKey);
    descriptor.enumerable = value;
  };
}

function getD(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('get', target, propertyKey);
    descriptor.configurable = value;
  };
}

const formatMetadataKey = Symbol('format');
function proD(value: string) {
  console.log('proD', value);

  return Reflect.metadata(formatMetadataKey, value);
}

function paramD(target: string, propertyKey: string, parameterIndex: number) {
  console.log('paramD', target, propertyKey, parameterIndex);
}

@ClassD
class Test1Class {
  @proD('long')
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  @sayD(false)
  sayName() {
    console.log(`my name is ${this.name}`);
  }

  log(@paramD verbose: boolean) {
    return 'verbose';
  }

  @getD(false)
  get myName() {
    return this.name;
  }
}

const tc1 = new Test1Class('john');

console.log(tc1.name); // 装饰器里设置了值 则返回装饰器里设置的值

tc1.sayName();

console.log(tc1.myName);

export {};
