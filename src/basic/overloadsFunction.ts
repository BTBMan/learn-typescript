// 函数重载 TODO

function Test(name: string): string;
function Test(gender: string, age: number): string;
function Test(nameOrGender: string, age?: number): string {
  if (age) {
    return `I'm ${age} years old`;
  } else {
    return nameOrGender;
  }
}

const t1 = Test('john');
const t2 = Test('man', 18);

console.log(t1);
console.log(t2);
