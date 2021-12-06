// never 用来表示一个永远不返回的值 一般用于函数的返回类型

function neverReturn(): never {
  throw new Error('error!!!');
}
