// template模板字符类型
type Union = {
  name: string;
  age: number;
  gender: 'man' | 'woman';
};

type Fun = {
  [P in keyof Union as `get${Capitalize<P>}`]: () => Union[P];
};

type W = 'World';
type H = `Hello ${W}`;
