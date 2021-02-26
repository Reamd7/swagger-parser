import type { ReferenceObject, Document } from "../base";

export const getDefinitionsObjectRef = (key: string) =>
  `#/definitions/${key.replace(/</g, "«").replace(/>/g, "»")}`;
export const getDefinitionsObjectkey = (key: string) =>
  key.substring(14).replace(/«/g, "<").replace(/»/g, ">");

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
    return this.sourceKey;
  }
  get SourceObject(): T {
    if (this.sourceObj) {
      return this.sourceObj;
    } else {
      if (this.predictType === "definitions") {
        const definedSet = this.base[this.predictType];
        const subType = definedSet ? definedSet[this.Objectkey] : undefined;
        if (!subType) {
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
        const subType = definedSet ? definedSet[this.Objectkey] : undefined;
        if (!subType) {
          throw Error(`${this.val.$ref} 不存在`);
        }
        this.sourceObj = (subType as unknown) as T;
        return this.sourceObj;
      } else {
        // } else if (this.predictType === "responses") {
        const definedSet = this.base[this.predictType];
        const subType = definedSet ? definedSet[this.Objectkey] : undefined;
        if (!subType) {
          throw Error(`${this.val.$ref} 不存在`);
        }
        this.sourceObj = (subType as unknown) as T;
        return this.sourceObj;
      }
    }
  }
  static getObjectRef(
    key: string,
    type: "definitions" | "parameters" = "definitions"
  ) {
    return `#/${type}/${key.replace(/</g, "«").replace(/>/g, "»")}`;
  }
  static getObjectkey(
    key: string,
    type: "definitions" | "parameters" = "definitions"
  ) {
    return key
      .substring(`#/${type}/`.length)
      .replace(/«/g, "<")
      .replace(/»/g, ">");
  }
}

// export default function ReferenceObject(obj: ReferenceObject) {
//   return getDefinitionsObjectkey(obj.$ref);
// }

export function isReferenceObject(obj: any): obj is ReferenceObject {
  return obj.$ref !== undefined;
}
