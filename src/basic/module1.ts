// 模块 已经补充了node的url模块 所以这里引用url模块并不会报错
import * as URL from 'url';

console.log(URL.parse); // 补充了parse的类型 不会报错
// console.log(URL.join); // 引用了一个未经过类型补充的字段 则会报错
