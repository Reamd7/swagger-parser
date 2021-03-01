原有思考：
如果这是一个不存在泛型的父类型，则有严重问题。因为现有泛型支持还不完善，不能直接通过泛型子类型生成泛型父类型。。。
但是存在这种边界情况：
```typescript
// 这是原有的泛型类
interface Params<T> {
  test: T;
  doc: string;
}
// 但是，如果T = string 时候，就会生成
type Test = Params<string> = {
  test: string;
  doc: string;
}
// 所以，这种类型就会生成为
// "#/definitions/Params<string>": {
//   type: "object",
//   properties: {
//     test: {
//       type: string;
//     },
//     doc: {
//       type: string;
//     }
//   }
// }
// // 如果仅根据上述结构生成的情况，就有可能生成出
// type Params<T> = {
//   test: T;
//   doc: T;
// }
// // 或者
// type Params<T> = {
//   test: string;
//   doc: T;
// }
// // 或者
// type Params<T> = {
//   test: T;
//   doc: string;
// }
// 所以可以推出，这根本没有一个可行的路径根据一个泛型具体结构推导出泛型模板类。


- 未来增强计划：
  - 实现 mock
  - 实现 params 校验
  - 里面还有些暂时无法处理的 TODO
  - 实现JavaScript JSDOC 版本

  - copy 支持 typescript axios
  - 支持 模板化 