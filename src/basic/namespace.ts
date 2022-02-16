// 命名空间用来组织代码 防止类型和变量的命名冲突等

namespace N1 {
  interface I1 {
    name: string;
  }

  // interface I1 {
  //   name: number; // error 如果声明了相同的interface 而内部的字段类型不相同 则会报错
  // }
}

// 想要使用命名空间里的内容 则必须要导出
namespace N2 {
  export interface I1 {
    name: string; // 有了命名空间 则不会冲突
  }

  // 可以导出任何东西 变量 函数 或是在导出一个命名空间
  export namespace C {
    export class C1 {
      med() {}
    }
    export const v1 = 'a';
  }
}

const typeNamespace: N2.I1 = { name: 'john' };

// 可以通过别名的方式使用
import C1 = N2.C.C1;
import v1 = N2.C.v1;

// 不同于别名import 定义变量不会显示原始引用 不信可以把鼠标放到变量名上面试试和import有什么不同
const VC1 = N2.C.C1;
const Vv1 = N2.C.C1;

console.log(C1);
console.log(VC1);
console.log(v1);

const c1 = new C1();
const c2 = new VC1();

export {};
