import { OpenAPIV2 } from "../openapi";
import noSupport from "../util/noSupport";
import tag from "../util/tag";
type TypeIn = "query" | "header" | "path" | "formData" | "body";

type Parameter = InBodyParameterObject | GeneralParameterObject;
interface InBodyParameterObject extends OpenAPIV2.ParameterObject {
  schema: OpenAPIV2.Schema;
  in: "body";
}
interface GeneralParameterObject
  extends OpenAPIV2.ParameterObject,
    OpenAPIV2.ItemsObject {
  allowEmptyValue?: boolean;
  in: "query" | "header" | "path" | "formData";
}



export default class ParameterClass {
  private readonly val: OpenAPIV2.Parameter;
  private get requiredString() {
    return this.val.required ? "?" : ""
  }
  constructor(val: OpenAPIV2.Parameter) {
    this.val = val;
  }

  validate() {
    const data = this.val;
    if (data.in === "path") {
      noSupport(
        data.required,
        `Parameter 参数对象 in: path => required 必须是 true `
      );
    }

    if (data.in !== "body") {
      if (data.type === "file") {
        // If type is "file", the consumes MUST be either "multipart/form-data", " application/x-www-form-urlencoded" or both and the parameter MUST be in "formData".
        noSupport(
          data.in === "formData",
          "data.type === file 仅在 formdata 可用"
        );
      }

      if (data.allowEmptyValue) {
        noSupport(
          data.in === "query" || data.in === "formData",
          "data.allowEmptyValue 仅在 query / formdata 可用"
        );
      }

      if (data.collectionFormat === "multi") {
        noSupport(
          data.in === "query" || data.in === "formData",
          "data.collectionFormat === multi 仅在 query / formdata 可用"
        );
      }
    }

    return data
  }

  typescript() {
    const data = this.validate();
    let dateType = "";
    if (data.in === "body") {
      dateType += `
      ${tag`/** ${data.description} */`}
      ${data.name}${this.requiredString}: ${data.schema}
      `
    } else {

    }
    
  }

  javascript() {}
}
