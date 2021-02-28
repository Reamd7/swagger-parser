import type {
  Document,
  Response,
  ResponseObject,
  ResponsesMapObject,
} from "../../base";
import ReferenceObjectClass, { isReferenceObject } from "../ReferenceObject";
import SchemaObjectClass from "../SchemaObject";

interface ResponseObjectClassReturnType {
  dataType: string;
  comment: string;
}

export default class ResponseObjectClass {
  protected val: ResponseObject;
  private base: Document;
  constructor(val: ResponseObject, base: Document) {
    this.val = val;
    this.base = base;
  }

  typescript(): ResponseObjectClassReturnType {
    const data = this.val;
    const comment = data.description ? `/** ${data.description} */\n` : "";

    // response structure
    if (data.schema) {
      const subTypeIns = new SchemaObjectClass(data.schema, this.base);
      const subType = subTypeIns.typescript();

      return {
        dataType: subType.dataType,
        comment: subType.comment ? comment + subType.comment : comment,
      };
    }
    // header response
    // TODO 暂时忽略。 AxiosResponse 的 headers 是 any;

    return {
      dataType: "",
      comment: comment,
    };
  }

  javascript() {}
}

export class ResponseClass {
  readonly _raw: Response;
  private _class: ResponseObjectClass;
  private base: Document;

  protected _rawRef: ReferenceObjectClass<ResponseObject> | null = null;
  constructor(val: Response, base: Document) {
    this._raw = val;
    this.base = base;
    if (!isReferenceObject(val)) {
      this._class = new ResponseObjectClass(val, this.base);
    } else {
      // 直接在此处找到 sourceObject，然后直接处理，就不对 ResponsesDefinitionsObject 进行处理，和 Definition 不一样
      this._rawRef = new ReferenceObjectClass<ResponseObject>(
        {
          $ref: val.$ref,
        },
        this.base
      );
      this._class = new ResponseObjectClass(
        this._rawRef.SourceObject,
        this.base
      );
    }
  }

  get SourceObject() {
    if (this._rawRef) {
      return this._rawRef.SourceObject;
    } else {
      return this._raw as ResponseObject;
    }
  }

  typescript() {
    return this._class.typescript();
  }

  javascript() {}
}

export class ResponsesMapObjectClass {
  protected val: ResponsesMapObject;
  private base: Document;
  private operationId: string;
  constructor(val: ResponsesMapObject, base: Document, operationId: string) {
    this.val = val;
    this.base = base;
    this.operationId = operationId;
  }

  get ResponsesKey() {
    return `${this.operationId}Response`;
  }

  typescript() {
    let result = "";

    const s = Object.entries(this.val)
      .map(([key, val]) => {
        if (val) {
          const res = new ResponseClass(val, this.base).typescript();
          if (res.dataType) {
            const TypeName = `${this.operationId}Response${key}`;
            result += `\
${res.comment}
export type ${TypeName} = ${res.dataType}`;
            return TypeName;
          }
        }
        return "";
      })
      .filter(Boolean);

    return (
      `export type ${this.ResponsesKey} = ${s.length > 0 ? s.join(" | ") : "unknown"}` + "\n" + result
    );
  }
}
