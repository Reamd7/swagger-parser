import type { Document, MimeTypes, OperationObject } from "../../base";
import tag from "../../util/tag";
import { ParameterClass } from "../ParameterObject";
import { ResponsesMapObjectClass } from "./ResponseObject";

export const In = ["query", "header", "path", "formData", "body"] as const;

interface OperationObjectReturnType {
  comment: string;
  data: {
    params: {
      key: string;
      type: string;
    };
    response: {
      key: string;
      type: string;
    };
    ["content-type"]: string[];
    ["accept"]: string[];
  };
}

export default class OperationObjectClass {
  static UrlToName(url: string) {
    return url.replace(/\{|\}/g, "").replace(/\/./g, (v) => v[1].toUpperCase());
  }

  static OperationName(baseMethod: string, method: string) {
    return baseMethod + "Using" + method.replace(/^./, (v) => v.toUpperCase());
  }

  protected val: OperationObject;
  private base: Document;
  private operationId: string;
  private url: string;
  private method: string;
  constructor(
    val: OperationObject,
    base: Document,
    {
      operationId,
      url,
      method,
    }: {
      operationId: ReturnType<typeof OperationObjectClass["OperationName"]>;
      url: string;
      method: string;
    }
  ) {
    this.val = val;
    this.base = base;
    this.operationId = operationId;
    this.url = url;
    this.method = method;
  }

  typescript(base: {
    consumes?: MimeTypes;
    produces?: MimeTypes;
  } = this.base): OperationObjectReturnType {
    const data = this.val;
    const operationId = this.operationId;
    // const operationId = data.operationId // 按道理是用这个的，但是，但是，JAVA swagger 生成器，会用函数名作为此参数值，但是，因为java写的不规范的情况下，这玩意会冲突，所以很多_1 的标识，
    let dataType = "";
    let comment = "";
    if (data.summary || data.description || data.deprecated) {
      comment = `/**
       ${tag`* ${data.deprecated ? "@deprecated\n" : ""}`}/
       ${tag`* @description ${data.deprecated}\n`}/
       ${tag`* @summary ${data.summary}\n`}/
       */`;
    }
    // 没有file params 情况下，就不需要 multipart/form-data

    // TODO 因为我没有见过这里面有用reference的情况，所以，先暂时忽略。
    // TODO 针对参数的识别，统一这里只是支持 OperationObject 内部直接定义的，不支持 ref，也不支持 PathItemObject 的 parameters，主要是没有遇见到。
    const paramsRecord: Record<string, Record<string, string>> = {};
    if (data.parameters) {
      for (const params of data.parameters) {
        const subTypeIns = new ParameterClass(params, this.base);
        const r = subTypeIns.SourceObject; // 直接找到 ref 具体对应的对象，然后完成这个\
        // hook
        if (r.in === "header" && r.name === "Authorization") {
          r.required = false;
          debugger;
        }
        if (!paramsRecord[r.in]) {
          paramsRecord[r.in] = {};
        }
        paramsRecord[r.in][r.name] = subTypeIns.typescript().dataType;
      }
    }
    const headerRequired = (() => {
      if (paramsRecord["header"]) {
        const len = Object.keys(paramsRecord["header"]).length;
        if (len === 1 && paramsRecord["header"]["Authorization"]) {
          return "?";
        } else if (len > 1) {
          return "";
        }
      }
      return "";
    })();

    const needFormData = "formData" in paramsRecord;
    const l = In.map((type) => {
      if (type === "header") {
        return paramsRecord[type]
          ? `${type}${headerRequired}: { ${Object.values(
              paramsRecord[type]
            ).join("\n")} }`
          : "";
      } else {
        return paramsRecord[type]
          ? `${type}: { ${Object.values(paramsRecord[type]).join("\n")} }`
          : "";
      }
    });
    // ----------------------------------------------------------
    // ----------------------------------------------------------
    // ----------------------------------------------------------
    const paramsKey = `${operationId}Params`;
    const paramsType = `export type ${paramsKey} = { 
      ${l.join("\n")} 
    }`;
    dataType += paramsType;

    // Content-Type
    const consumes = Array.from<string>(
      new Set([
        ...(base.consumes || []),
        ...(data.consumes || []),
        ...(needFormData ? ["multipart/form-data"] : []),
      ])
    );
    // accept
    const produces = Array.from<string>(
      new Set([...(base.produces || []), ...(data.produces || [])])
    );

    const responseIns = new ResponsesMapObjectClass(
      this.val.responses,
      this.base,
      this.operationId
    );
    const responseType = responseIns.typescript();

    return {
      data: {
        params: {
          key: paramsKey,
          type: paramsType,
        },
        response: {
          key: responseIns.ResponsesKey,
          type: responseType,
        },
        accept: produces,
        "content-type": consumes,
      },
      comment,
    };
  }
}
