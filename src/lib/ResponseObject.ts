import type { ResponseObject } from "../base";
import { SchemaClass } from "./SchemaObject";

interface ResponseObjectClassReturnType {
  dataType: string;
  comment: string;
}

export default class ResponseObjectClass {
  protected val: ResponseObject;
  constructor(val: ResponseObject) {
    this.val = val;
  }

  typescript(): ResponseObjectClassReturnType {
    const data = this.val;
    const subType = new SchemaClass(data.schema).typescript();
    const dataType = subType.dataType;
    const comment = data.description ? `/** ${data.description} */` : "";
    return {
      dataType,
      comment: subType.comment ? subType.comment : comment,
    };
  }

  javascript() {}
}
