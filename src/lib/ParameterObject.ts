import type { ParameterObject, Parameter, Document } from "../base";
import tag from "../util/tag";
import ItemsObjectClass from "./ItemsObject";
import ReferenceObjectClass from "./ReferenceObject";
import { isReferenceObject } from "./ReferenceObject";
import SchemaObjectClass from "./SchemaObject";

export default class ParameterObjectClass {
  readonly _raw: ParameterObject;
  private base: Document;
  private get requiredString() {
    return this._raw.required ? "" : "?";
  }
  constructor(val: ParameterObject, base: Document) {
    this._raw = val;
    this.base = base;
  }

  typescript() {
    const data = this._raw;
    let depsIndentify: Set<string>
    const comment = tag`\n/** ${data.description} */`;
    let dataType = "";
    if (data.in === "body") {
      const subType = new SchemaObjectClass(
        data.schema,
        this.base
      ).typescript();
      depsIndentify = subType.depsIndentify;
      dataType += `${comment + subType.comment}
      ${data.name}${this.requiredString}: ${subType.dataType}`;
    } else {
      if (data.type === "file") {
        dataType += `${comment}
        ${data.name}${this.requiredString}: File`;
        depsIndentify = new Set<string>();
      } else {
        // TODO NOTE 实际上这里是不合适的，因为 collectionFormat?: "csv" | "ssv" | "tsv" | "pipes" 类型不匹配，在暂时不用这个的情况下，可以临时用
        const subType = new ItemsObjectClass(
          data as any,
          this.base
        ).typescript();
        dataType += `${comment + subType.comment}
        ${data.name}${this.requiredString}: ${subType.dataType}`;
        depsIndentify = subType.depsIndentify;
      }
    }

    return {
      dataType,
      depsIndentify
    };
  }

  javascript() {}
}

export class ParameterClass {
  readonly _raw: Parameter;
  private _class: ParameterObjectClass;
  private base: Document;
  protected _rawRef: ReferenceObjectClass<ParameterObject> | null = null;
  constructor(val: Parameter, base: Document) {
    this._raw = val;
    this.base = base;
    if (!isReferenceObject(val)) {
      this._class = new ParameterObjectClass(val, this.base);
    } else {
      // 直接在此处找到 sourceObject，然后直接处理，就不对 ParametersDefinitionsObject 进行处理，和 Definition 不一样
      this._rawRef = new ReferenceObjectClass<ParameterObject>(
        {
          $ref: val.$ref,
        },
        this.base
      );
      this._class = new ParameterObjectClass(
        this._rawRef.SourceObject,
        this.base
      );
    }
  }

  get SourceObject() {
    if (this._rawRef) {
      return this._rawRef.SourceObject;
    } else {
      return this._raw as ParameterObject;
    }
  }

  typescript() {
    return this._class.typescript();
  }

  javascript() {}
}
