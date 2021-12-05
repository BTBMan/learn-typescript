// typeof用于把变量属性等转换为类型

const a = 'hello';
let b: typeof a; // string

function f() {
  return true;
}
let c: typeof f; // () => boolean
