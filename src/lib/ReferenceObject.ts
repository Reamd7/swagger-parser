import type { ReferenceObject, Document } from "../base";
import templateTypeParse from "../util/templateTypeParse";

export const getDefinitionsObjectRef = (key: string) =>
  `#/definitions/${key.replace(/</g, "«").replace(/>/g, "»")}`;
export const getDefinitionsObjectkey = (key: string) =>
  key.substring(14).replace(/«/g, "<").replace(/»/g, ">");

// NOTE 其实这里是有一个前提条件的限制：必须 ref string : #/definitions/RefName

export default class ReferenceObjectClass<T> {
  private readonly val: ReferenceObject;
  private readonly base: Document;
  private readonly predictType: "definitions" | "parameters" | "responses";
  private readonly sourceKey: string;
  private sourceObj: T | null = null;
  constructor(val: ReferenceObject, base: Document) {
    this.base = base;
    this.val = val;

    const $ref = val.$ref.split("/");
    if (
      $ref[1] === "definitions" ||
      $ref[1] === "parameters" ||
      $ref[1] === "responses"
    ) {
      this.predictType = $ref[1];
    } else {
      throw Error("no support " + val.$ref);
    }

    this.sourceKey = $ref[2];
  }

  get ObjectRef() {
    return `#/${this.predictType}/${this.sourceKey
      .replace(/</g, "«")
      .replace(/>/g, "»")}`;
  }
  get Objectkey() {
    const type = this.predictType;
    if (type === "definitions") {
      let key = this.sourceKey;
      key = key.startsWith(`#/${type}/`)
        ? key.substring(`#/${type}/`.length)
        : key;

      // 这里添加一个父类型
      const tempType = templateTypeParse(key);
      if (typeof tempType === "string") {
        // 这不是一个泛型。
        return tempType;
      } else {
        const parentsType = tempType[0].parent;
        if (
          this.base.definitions ? this.base.definitions[parentsType] : false
        ) {
          // if (this.base[this.predictType]?[parentsType]) {
          // 这是有泛型父模板的，所以肯定是处理过的泛型
          return key
            .replace(/«/g, "<")
            .replace(/»/g, ">")
            .replace(/List</g, "Array<")
            .replace(/Map</g, "Record<");
        } else {
          return key.replace(/«/g, "_").replace(/»/g, "_");
        }
      }
    } else {
      return ReferenceObjectClass.getObjectkey(
        this.sourceKey,
        this.predictType
      );
      // return this.sourceKey;
    }
  }

  get SourceObject(): T {
    if (this.sourceObj) {
      return this.sourceObj;
    } else {
      if (this.predictType === "definitions") {
        const definedSet = this.base[this.predictType];
        const subType = definedSet ? definedSet[this.sourceKey] : undefined;
        if (!subType) {
          // 这首先有一个处理的逻辑可以处理一下
          throw Error(`${this.val.$ref} 不存在`);
        }
        if (subType.$ref) {
          this.sourceObj = (new ReferenceObjectClass(
            {
              $ref: subType.$ref,
            },
            this.base
          ).SourceObject as unknown) as T;
        } else {
          this.sourceObj = (subType as unknown) as T;
        }
        return this.sourceObj;
      } else if (this.predictType === "parameters") {
        const definedSet = this.base[this.predictType];
        const subType = definedSet ? definedSet[this.sourceKey] : undefined;
        if (!subType) {
          throw Error(`${this.val.$ref} 不存在`);
        }
        this.sourceObj = (subType as unknown) as T;
        return this.sourceObj;
      } else {
        // } else if (this.predictType === "responses") {
        const definedSet = this.base[this.predictType];
        const subType = definedSet ? definedSet[this.sourceKey] : undefined;
        if (!subType) {
          throw Error(`${this.val.$ref} 不存在`);
        }
        this.sourceObj = (subType as unknown) as T;
        return this.sourceObj;
      }
    }
  }
  // static getObjectRef(
  //   key: string,
  //   type: "definitions" | "parameters" | "responses" = "definitions"
  // ) {
  //   return `#/${type}/${key.replace(/</g, "«").replace(/>/g, "»")}`;
  // }
  static getObjectkey(
    key: string,
    type: "definitions" | "parameters" | "responses" = "definitions"
  ) {
    // NOTE: 这是不可能实现的，必须有父类型模板，然后与泛型模板diff才有可能生成出正确的泛型类）见 Readme.md;
    key = key.startsWith(`#/${type}/`)
      ? key.substring(`#/${type}/`.length)
      : key;
    return key
      .replace(/«/g, "<")
      .replace(/»/g, ">")
      .replace(/List</g, "Array<")
      .replace(/Map</g, "Record<");
  }
}

// export default function ReferenceObject(obj: ReferenceObject) {
//   return getDefinitionsObjectkey(obj.$ref);
// }

export function isReferenceObject(obj: any): obj is ReferenceObject {
  return obj.$ref !== undefined;
}
