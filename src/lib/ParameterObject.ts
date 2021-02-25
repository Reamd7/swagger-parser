import type { ParameterObject } from "../base";
import tag from "../util/tag";
import ItemsObjectClass from "./ItemsObject";
import SchemaObjectClass from "./SchemaObject";

export default class ParameterClass {
  readonly _raw: ParameterObject;
  private get requiredString() {
    return this._raw.required ? "?" : "";
  }
  constructor(val: ParameterObject) {
    this._raw = val;
  }

  typescript() {
    const data = this._raw;
    const comment = tag`\n/** ${data.description} */`;
    let dataType = "";
    if (data.in === "body") {
      const subType = new SchemaObjectClass(data.schema).typescript();
      dataType += `${comment + subType.comment}
      ${data.name}${this.requiredString}: ${subType.dataType}`;
    } else {
      if (data.type === "file") {
        dataType += `${comment}
        ${data.name}${this.requiredString}: File`;
      } else {
        // TODO 实际上这里是不合适的，因为 collectionFormat?: "csv" | "ssv" | "tsv" | "pipes" 类型不匹配，在暂时不用这个的情况下，可以临时用
        const subType = new ItemsObjectClass(data as any).typescript();
        dataType += `${comment + subType.comment}
        ${data.name}${this.requiredString}: ${subType.dataType}`;
      }
    }

    return {
      dataType
    }
  }

  javascript() {}
}
