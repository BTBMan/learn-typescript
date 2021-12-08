declare namespace JSX {
  // 内联元素
  interface IntrinsicElements {
    foo: { bar?: boolean; children?: {} }; // 元素的prop属性 children指元素的子级
    bar: any;
    // [ele: string]: any; // 任何元素
  }

  // 这里用来指定子元素的类型 要对应到prop里
  interface ElementChildrenAttribute {
    children: {};
  }

  // 类组件
  interface ElementClass {
    render: any;
  }

  // 类组件的属性
  interface ElementAttributesProperty {
    props: any;
  }
}

<foo>
  <bar />;
</foo>; // ok
// <bar />; // error 内联元素中没有定义该元素

// 函数组件 函数组件也可以使用函数重载
// 定义组件的prop类型
interface FooProp {
  name: string;
  X: number;
  Y: number;
}

// 定义一个组件 接收的第一个参数为组件的prop 第二个参数为组件的上下文
declare function AnotherComponent(prop: { name: string; age: number }): void;

function ComponentFoo(prop: FooProp) {
  return <AnotherComponent name={prop.name} age={12} />;
}

const Button = (prop: { value: string }, context: { color: string }) => <foo />;

// 类组件
class MyComp {
  props: {
    isShow: boolean;
    children?: any; // 这里用来表示子元素
  };

  children: any;

  constructor(props: any) {
    this.props = props;
  }

  render() {}
}

function MyFtComp() {
  return {
    render() {},
  };
}

class ErrorComp {}

function ErrorFtComp() {}

<MyComp isShow={true}>
  <MyFtComp />;
</MyComp>;
<MyComp isShow={true} />;
<MyFtComp />;
// <ErrorComp />; // 错误 缺少元素
// <ErrorFtComp />; // 错误 缺少元素
