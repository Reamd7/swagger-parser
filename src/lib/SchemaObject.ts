import type { Document, SchemaObject } from "../base";
// import noSupport from "../util/noSupport";
import tag from "../util/tag";
import { ItemsClass } from "./ItemsObject";
import ReferenceObjectClass from "./ReferenceObject";

export interface SchemaObjectClassReturnType {
  dataType: string;
  comment: string;
}

/**
 * 基于规范
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#schemaObject
 */
export default class SchemaObjectClass {
  protected readonly val: SchemaObject;
  protected readonly base: Document;
  protected _rawRef: ReferenceObjectClass<SchemaObject> | null = null;
  static Format2Type = {
    int32: "integer",
    int64: "integer",
    float: "number",
    double: "number",
    byte: "string",
    binary: "string",
    date: "string",
    "date-time": "string",
    password: "string",
  };
  constructor(val: SchemaObject, base: Document) {
    this.val = val;
    this.base = base;
    if (val.$ref) {
      this._rawRef = new ReferenceObjectClass<SchemaObject>(
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
      return this.val;
    }
  }

  typescript(): SchemaObjectClassReturnType {
    const data = this.val;
    if (data.$ref) {
      const subDataType = this._rawRef
        ? this._rawRef
        : (this._rawRef = new ReferenceObjectClass<SchemaObject>(
            {
              $ref: data.$ref,
            },
            this.base
          ));
      return {
        comment: "",
        dataType: subDataType.Objectkey,
      };
    } else {
      // -----------------------------------------------------
      // 如果不是支持的类型就原样输出
      // 目的是支持泛型的能力
      let dataType = data.type || "unknown";
      let comment =
        data.title || data.description || data.readOnly !== undefined
          ? tag`/**
${[
  tag`* @title ${data.title}`,
  tag`* @description ${data.description}`,
  tag`* @readOnly ${data.readOnly}`,
]
  .filter(Boolean)
  .join("\n")}
 */`.trim()
          : "";
      switch (data.type) {
        case "null":
          dataType = "null";
          break;
        case "string":
          if (data.enum) {
            console.warn(`enum is ${data.enum}`);
            dataType = data.enum.map((v) => `"${v}"`).join(" | ");
          } else if (data.format) {
            dataType = data.format.replace(/\-/g, "");
          } else {
            dataType = "string";
          }
          // 先不进行string
          break;
        case "number":
        case "integer":
          if (data.enum) {
            console.warn(`enum is ${data.enum}`);
            dataType = data.enum.join(" | ");
          } else if (data.format) {
            dataType = data.format;
          } else {
            dataType = "number";
          }
          break;
        case "boolean":
          dataType = "boolean";
          break;
        case "array":
          if (data.items) {
            // if (Array.isArray(data.items)) {
            //   // [ A, B, C, D ]
            //   let subType = data.items.map((v) => {
            //     return new SchemaObjectClass(v).typescript();
            //   });
            //   dataType = subType.map((v) => v.dataType).join(", ");
            // } else {
            let subType = new ItemsClass(data.items).typescript();
            dataType = `Array<${subType.dataType}>`;
            // }
          } else {
            dataType = "Array<unknown>";
          }
          break;
        case "object":
          let additionalType = "";

          if (data.additionalProperties === true) {
            additionalType = `& { [index: string] : any} `;
          } else if (typeof data.additionalProperties === "object") {
            const isReadOnly = data.additionalProperties.readOnly === true;
            const subType = new SchemaObjectClass(
              data.additionalProperties,
              this.base
            ).typescript();
            additionalType = `& {
            ${subType.comment}
            ${isReadOnly ? "readonly " : ""}[index: string]: ${subType.dataType}
          } `;
          }

          const required = data.required || [];
          if (data.properties) {
            const subType = Object.keys(data.properties).map((propsName) => {
              const isRequired = required.indexOf(propsName) > -1 ? "" : "?";
              const el = data.properties![propsName];
              const isReadOnly = el.readOnly ? "readonly " : "";
              const subType = new SchemaObjectClass(el, this.base).typescript();
              return {
                dataType: `
                ${subType.comment}
                ${isReadOnly}${propsName}${isRequired}: ${subType.dataType}
              `.trim(),
              };
            });
            dataType =
              `{ ${subType.map((v) => v.dataType).join("\n")} }` +
              additionalType;
          } else {
            dataType = `Record<string,object>`;
          }
          break;
      }
      return {
        dataType,
        comment,
      };
    }
  }

  javascript() {}
}

export function rewriteSchemaObjectType<T extends SchemaObject = SchemaObject>(
  type: string,
  obj: T
) {
  return {
    type,
    // comment
    title: obj.title,
    description: obj.description,
    readOnly: obj.readOnly,
  } as T;
}
