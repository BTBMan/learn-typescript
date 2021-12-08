// 模块 对于没有类型支持的模块或第三方模块 我们可以自己定义d.ts文件来补充模块的类型
// 比如现在我们补充的node下的url模块
declare module 'url' {
  export interface Url {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }
  export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}

// 如果不想编写类型 则可以速记声明 这样这个模块就是any
declare module 'someModule';

// 当然module名可以使用通配符匹配
declare module '*.json';
