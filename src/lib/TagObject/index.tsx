import type { TagObject } from "../../base";

export default function TagObject(obj: TagObject[]) {
  return obj.reduce((res, value) => {
    res[value.name] = {
      info: value,
      moduleList: [],
      moduleTag: []
    }
    return res;
  }, {} as Record<string, {
    info: TagObject,        // 标注 Tag
    moduleList: unknown[],  // 模块列表
    moduleTag: string[]     // 需要引入的 module
  }>);
}