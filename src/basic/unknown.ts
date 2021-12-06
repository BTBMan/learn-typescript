// unknown 类型比 any 类型更安全 推荐使用unknown代替any

function safeParse(s: string): unknown {
  return JSON.parse(s);
}

const obj = safeParse('sdflsdkjfkla');
