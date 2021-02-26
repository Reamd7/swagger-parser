import type {
  ParameterObject,
  Parameter,
  Document,
} from "../base";
import tag from "../util/tag";
import ItemsObjectClass from "./ItemsObject";
import ReferenceObjectClass from "./ReferenceObject";
import { isReferenceObject } from "./ReferenceObject";
import SchemaObjectClass from "./SchemaObject";

export default class ParameterObjectClass {
  readonly _raw: ParameterObject;
  private base: Document;
  private get requiredString() {
    return this._raw.required ? "?" : "";
  }
  constructor(val: ParameterObject, base: Document) {
    this._raw = val;
    this.base = base;
  }

  typescript() {
    const data = this._raw;
    const comment = tag`\n/** ${data.description} */`;
    let dataType = "";
    if (data.in === "body") {
      const subType = new SchemaObjectClass(
        data.schema,
        this.base
      ).typescript();
      dataType += `${comment + subType.comment}
      ${data.name}${this.requiredString}: ${subType.dataType}`;
    } else {
      if (data.type === "file") {
        dataType += `${comment}
        ${data.name}${this.requiredString}: File`;
      } else {
        // TODO 实际上这里是不合适的，因为 collectionFormat?: "csv" | "ssv" | "tsv" | "pipes" 类型不匹配，在暂时不用这个的情况下，可以临时用
        const subType = new ItemsObjectClass(
          data as any,
          this.base
        ).typescript();
        dataType += `${comment + subType.comment}
        ${data.name}${this.requiredString}: ${subType.dataType}`;
      }
    }

    return {
      dataType,
    };
  }

  javascript() {}
}

export class ParameterClass {
  readonly _raw: Parameter;
  private _class: ParameterObjectClass | null = null;
  private base: Document;
  protected _rawRef: ReferenceObjectClass<ParameterObject> | null = null;
  constructor(val: Parameter, base: Document) {
    this._raw = val;
    this.base = base;
    if (!isReferenceObject(val)) {
      this._class = new ParameterObjectClass(val, this.base);
    } else {
      this._rawRef = new ReferenceObjectClass<ParameterObject>(
        {
          $ref: val.$ref,
        },
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
    const data = this._raw;

    if (isReferenceObject(data)) {
      return {
        dataType: this._rawRef?.Objectkey || "unknown",
      };
    } else {
      return this._class!.typescript().dataType;
    }
  }

  javascript() {}
}
