import type { DefinitionsObject, Document, SchemaObject } from "../../base";
import tag from "../../util/tag";
import SchemaObjectClass, { rewriteSchemaObjectType } from "../SchemaObject";
import { addedDiff } from "deep-object-diff";
import templateTypeParse, {
  templateTypeEach,
} from "../../util/templateTypeParse";

const GenericValueList = [
  "T",
  "S",
  "U",
  "V",
  "M",
  "N",
  "E",
  "A",
  "B",
  "C",
  "D",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "O",
  "P",
  "Q",
  "R",
  "W",
  "X",
  "Y",
  "Z",
];
export interface DefinitionsObjectClassReturnType {
  dataType: string;
  changeTemplateType: Record<string, string>;
}
export default class DefinitionsObjectClass {
  private val: DefinitionsObject;
  private base: Document;
  private passTemplateType: string[] = [];

  constructor(base: Document) {
    this.val = base["definitions"]!;
    this.base = base;
  }

  Generic() {
    // 用一个记录器将他修了。
    const passTemplateType = this.passTemplateType;
    // 由于 OpenApi 里面没有泛型 的支持
    for (const key in this.val) {
      if (Object.prototype.hasOwnProperty.call(this.val, key)) {
        // 这是一个 key
        if (key.indexOf("«") !== -1 && key.indexOf("»") !== -1) {
          const tempType = templateTypeParse(key);
          if (typeof tempType !== "string") {
            // 这是必然的, 因为上一个 indexOf
            templateTypeEach(tempType[0], (v) => {
              if (
                !passTemplateType.includes(v.parent) &&
                v.parent in this.val // 这个泛型的父类型有定义（完成处理过这个父类型就会删掉）
              ) {
                const ParentData = this.val[v.parent]; // 泛型的父类型
                const GenericData = this.val[key]; // 泛型的具体实现类型
                const diffData = addedDiff(ParentData, GenericData) as any;

                if (
                  ParentData.type === "object" &&
                  GenericData.type === "object"
                ) {
                  if (v.args.length <= GenericValueList.length) {
                    // 具体类型 => 泛型标签
                    const GenericMap = v.args.reduce((res, val, index) => {
                      if (typeof val === "string") {
                        res[val] = GenericValueList[index];
                      } else {
                        res[val._raw] = GenericValueList[index];
                      }
                      return res;
                    }, {} as Record<string, string>);

                    const GenericValueSubList: string[] = [];

                    if (diffData.properties) {
                      for (const propsName in diffData.properties) {
                        if (
                          Object.prototype.hasOwnProperty.call(
                            diffData.properties,
                            propsName
                          )
                        ) {
                          // TODO 这里的实现有点问题，应该结合泛型来写的。
                          // ParentData.properties[propsName].type = GenericMap[propsName];
                          const diffEl = diffData.properties[
                            propsName
                          ] as SchemaObject;
                          // TODO NOTE 这里是针对JAVA的生成出来的代码处理的。所以才有«»

                          // 进行所有的 Schema 解析为 具体类型的表述，然后替换掉« » Array => List ( 希望匹配到 GenericMap 的 key )
                          const diffElSub = new SchemaObjectClass(
                            diffEl,
                            this.base
                          )
                            .typescript()
                            .dataType.replace(/</g, "«")
                            .replace(/>/g, "»")
                            .replace(/Array</g, "List«")
                            .replace(/Map</g, "Record«");

                          let genType = GenericMap[diffElSub]; // 查到 泛型标签
                          if (genType) {
                            // 将原有类型替换成为泛型标签
                            if (ParentData.properties) {
                              ParentData.properties[
                                propsName
                              ] = rewriteSchemaObjectType(
                                genType,
                                ParentData.properties[propsName] // 原有obj
                              );
                              // 将 泛型List，按顺序注入泛型标签，最后生成 title
                              GenericValueSubList.push(genType);
                              delete GenericMap[diffElSub];
                            }
                          } else {
                            console.error("泛型 不匹配 ");
                          }
                        }
                      }

                      // 完成之后，删掉原有的父类型
                      this.passTemplateType.push(v.parent);
                      // delete this.val[v.parent]; // 不能删除，因为 ReferenceObject 处还要找到这个原有的类型。
                      this.val[
                        `${v.parent}<${GenericValueSubList.map(
                          (v) => `${v} = any`
                        ).join(",")}>`
                      ] = ParentData; // 注入泛型类型便于进行生成。。。
                    }
                  } else {
                    throw Error(`${key} 泛型数量过长`);
                  }
                }
              }
            });
          }
        }
        // const definition = new SchemaObjectClass(element).typescript();
      }
    }
    return this.passTemplateType;
  }

  typescript(): DefinitionsObjectClassReturnType {
    let dataType = "";
    const passTemplateType = this.Generic();
    // 以后在url参数识别，返回值识别的时候需要用到，判断which是需要保留泛型，which是需要根据这个map替换的
    const changeTemplateType: Record<string, string> = {};

    for (const key in this.val) {
      if (Object.hasOwnProperty.call(this.val, key)) {
        if (this.passTemplateType.includes(key)) continue; // 在这里去除掉已经存在的泛型父类型 的输出
        const element = this.val[key];
        if (key.indexOf("«") !== -1 && key.indexOf("»") !== -1) {
          // 进行解析，然后，得到parent，然后进行按需过滤。
          const tempType = templateTypeParse(key);
          // 如果已经处理过的泛型就跳过，如果没有处理过的就保留
          if (
            Array.isArray(tempType) &&
            tempType[1].filter((v) => !passTemplateType.includes(v)).length > 0
          ) {
            changeTemplateType[key] = key.replace(/«/g, "_").replace(/»/g, "_");
            // 需要进行处理了。
            const name = changeTemplateType[key];
            // const type = element.type || "object"; // TODO
            const subTypeIns = new SchemaObjectClass(element, this.base);
            const subType = subTypeIns.typescript();

            dataType += `${tag`${subType.comment}\n`}export type ${name} = ${
              subType.dataType
            }\n`;
          }
        } else {
          const name = key;
          const subTypeIns = new SchemaObjectClass(element, this.base);
          const subType = subTypeIns.typescript();

          dataType += `${tag`${subType.comment}\n`}export type ${name} = ${
            subType.dataType
          }\n`;
        }
      }
    }

    return {
      dataType,
      changeTemplateType,
    };
  }

  javascript() {}
}
