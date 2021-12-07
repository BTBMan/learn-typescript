// 枚举 一般来说使用javascript对象配合as const则可代替enum 使用enum在typescript里则是为了使代码保持一致

enum Ea {
  A,
  B = 3,
  C,
}

type TEa = keyof typeof Ea; // 'A' | 'B' | 'C'

console.log(Ea.A); // 不初始化值则从0开始
console.log(Ea.B); // 初始化值 则就是初始化的值
console.log(Ea.C); // 之前的值+1

/* ========== */

enum Eb {
  A = 'a',
  B = 1,
  C,
  D = 1.1,
  E,
}

console.log(Eb.A); // a 如果赋值一个非数字类型 则之后的枚举必须要赋值
console.log(Eb.B);
console.log(Eb.C); // 如果前面赋值的是数字 则当前的可以不用赋值
console.log(Eb.D);
console.log(Eb.E); // 之前的如果赋值的是小数的话 则当前的也是+1

enum Ec {
  A = 1,
  B,
  C = 2,
  D = 2,
  E,
}

console.log(Ec.A);
console.log(Ec.B);
console.log(Ec.C); // 如果当前赋的值是前一个未赋值的枚举应该返回的值 则前一个和当前的值是一样的
console.log(Ec.D); // 如果当前赋的值和前一个值赋的值是一样的话 则他们的值是一样的
console.log(Ec.E); // 当前的值仍然是根据前一个值+1
