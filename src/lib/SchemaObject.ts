import type { Document, SchemaObject } from "../base";
// import noSupport from "../util/noSupport";
import tag from "../util/tag";
import { ItemsClass } from "./ItemsObject";
import ReferenceObjectClass from "./ReferenceObject";

export interface SchemaObjectClassReturnType {
  dataType: string;
  comment: string;
  depsIndentify: Set<string>;
}

/**
 * 基于规范
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#schemaObject
 */
export default class SchemaObjectClass {
  protected readonly val: SchemaObject;
  protected readonly base: Document;
  protected _rawRef: ReferenceObjectClass<
    Omit<SchemaObject, "$ref">
  > | null = null;
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
      this._rawRef = new ReferenceObjectClass<Omit<SchemaObject, "$ref">>(
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
    if (data.type) {
      // -----------------------------------------------------
      // 如果不是支持的类型就原样输出
      // 目的是支持泛型的能力
      const depsIndentify = new Set<string>();
      let dataType: string = data.type || "unknown";

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
            depsIndentify.add(dataType);
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
            depsIndentify.add(dataType);
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
            let subType = new ItemsClass(data.items, this.base).typescript();
            dataType = `Array<${subType.dataType}>`;
            subType.depsIndentify.forEach((v) => depsIndentify.add(v));
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
            const ref = new SchemaObjectClass(
              data.additionalProperties,
              this.base
            );
            const subType = ref.typescript();
            const isReadOnly = ref.SourceObject.readOnly === true;

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
                depsIndentify: subType.depsIndentify,
              };
            });
            dataType =
              `{ ${subType.map((v) => v.dataType).join("\n")} }` +
              additionalType;

            subType.forEach((v) => {
              v.depsIndentify.forEach((v) => depsIndentify.add(v));
            });
          } else {
            dataType = `Record<string,object>`;
          }
          break;
      }
      return {
        dataType,
        comment,
        depsIndentify,
      };
    } else if (data.$ref) {
      const subDataType = this._rawRef
        ? this._rawRef
        : (this._rawRef = new ReferenceObjectClass<SchemaObject>(
            {
              $ref: data.$ref,
            },
            this.base
          ));
      const comment = new SchemaObjectClass(
        this.SourceObject,
        this.base
      ).typescript().comment;
      return {
        comment: comment,
        dataType: subDataType.Objectkey,
        depsIndentify: subDataType.depsIndentify,
      };
    } else {
      return {
        comment: comment,
        dataType: "unknown",
        depsIndentify: new Set(),
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
