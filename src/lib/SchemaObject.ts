import type { OpenAPIV2 } from "../openapi";
import noSupport from "../util/noSupport";
import tag from "../util/tag";
import ItemsObjectClass from "./ItemsObject";
import ReferenceObject from "./ReferenceObject";

type JSONType =
  | "string"
  | "integer"
  | "number"
  | "object"
  | "array"
  | "boolean"
  | "null";

interface SchemaObject_MetaPart {
  title?: string;
  description?: string;

  readOnly?: boolean;

  allOf?: OpenAPIV2.SchemaObject[]; // 必须对其中所有定义都有效
  enum?: any[]; // 联合类型 A | B | C // TODO 支持
  $ref?: string;
}

export type StaticSchemaObject = (
  | { type: "null" }
  | {
      // 整数类型
      type: "integer";
      format?: "int32" | "int64";

      // Validation keywords sorted by instance types
      multipleOf?: number; // value 是 multipleOf 的倍数
      // x ≥ minimum
      // x > exclusiveMinimum
      // x ≤ maximum
      // x < exclusiveMaximum
      maximum?: number;
      exclusiveMaximum?: boolean;
      minimum?: number;
      exclusiveMinimum?: boolean;
    }
  | {
      // 浮点数
      type: "number";
      format?: "float" | "double";

      // Validation keywords sorted by instance types
      multipleOf?: number; // value 是 multipleOf 的倍数
      // x ≥ minimum
      // x > exclusiveMinimum
      // x ≤ maximum
      // x < exclusiveMaximum
      maximum?: number;
      exclusiveMaximum?: boolean;
      minimum?: number;
      exclusiveMinimum?: boolean;
    }
  | {
      type: "string";
      format?: "byte" | "binary" | "date" | "password" | "date-time";

      maxLength?: number; // 字符串最大长度
      minLength?: number; // 字符串最小长度
      pattern?: string; // 字符串匹配正则表达式
    }
  | {
      type: "array";
      // type array 校验
      maxItems?: number; // 数组最大items数
      minItems?: number; // 数组最小items数
      uniqueItems?: boolean; // 数组中每个items都必须是唯一的
      // items?: OpenAPIV2.SchemaObject | OpenAPIV2.SchemaObject[];
      items?: OpenAPIV2.ItemsObject;
    }
  | {
      type: "object";
      // type object 校验
      maxProperties?: number; // object最大props数
      minProperties?: number; // object最小props数
      required?: string[]; // 必须props属性
      properties?: {
        [name: string]: OpenAPIV2.SchemaObject;
      };
      additionalProperties?: boolean | OpenAPIV2.SchemaObject; // 是否支持 [index: string] : XXX类型；
    }
  | {
      type: "boolean";
    }
) &
  SchemaObject_MetaPart;

// export type ty<T> = T extends JSONType ? never : T | void;

export interface SchemaObjectClassReturnType {
  dataType: string;
  comment: string;
}

/**
 * 基于规范
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#schemaObject
 */
export default class SchemaObjectClass {
  private readonly val: OpenAPIV2.SchemaObject;
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
  constructor(val: OpenAPIV2.SchemaObject) {
    this.val = val;
  }

  validate(): StaticSchemaObject {
    const Format2Type = SchemaObjectClass.Format2Type;
    const val = this.val;
    // TODO 我暂时不知道有什么用。
    // Adds support for polymorphism. The discriminator is the schema property name that is used to differentiate between other schema that inherit this schema. The property name used MUST be defined at this schema and it MUST be in the required property list. When used, the value MUST be the name of this schema or any schema that inherits it.
    noSupport(val.discriminator, "暂时不支持 SchemaObject.discriminator");
    // This MAY be used only on properties schemas. It has no effect on root schemas. Adds Additional metadata to describe the XML representation format of this property.
    noSupport(val.xml, "暂时不支持 SchemaObject.xml");
    noSupport(val.externalDocs, "暂时不支持 SchemaObject.externalDocs");
    noSupport(val.example, "暂时不支持 SchemaObject.example");
    noSupport(val.example, "暂时不支持 SchemaObject.example");
    noSupport(val.default, "暂时不支持 SchemaObject.default");
    noSupport(val.allOf, "暂时不支持 SchemaObject.allOf");
    // format
    // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat
    if (val.format) {
      if (!(val.format in Format2Type)) {
        noSupport(`不支持 format => ${val.format}`);
      } else if (Format2Type[val.format] !== val.type) {
        noSupport(
          `根据 format => ${val.format}, type 应为 ${
            Format2Type[val.format]
          }, 现在为${val.type}`
        );
      }
    }

    noSupport(val.allOf, "暂时不支持 SchemaObject.allOf");
    if (val.type !== "integer" && val.type !== "number") {
      noSupport(
        val.multipleOf,
        "不支持 SchemaObject 不为数字类型 使用 SchemaObject.multipleOf"
      );
      noSupport(
        val.maximum,
        "不支持 SchemaObject 不为数字类型 使用 SchemaObject.maximum"
      );
      noSupport(
        val.exclusiveMaximum,
        "不支持 SchemaObject 不为数字类型 使用 SchemaObject.exclusiveMaximum"
      );
      noSupport(
        val.minimum,
        "不支持 SchemaObject 不为数字类型 使用 SchemaObject.minimum"
      );
      noSupport(
        val.exclusiveMinimum,
        "不支持 SchemaObject 不为数字类型 使用 SchemaObject.exclusiveMinimum"
      );
    }
    if (val.type !== "string") {
      noSupport(
        val.maxLength,
        "不支持 SchemaObject 不为string类型 使用 SchemaObject.maxLength"
      );
      noSupport(
        val.minLength,
        "不支持 SchemaObject 不为string类型 使用 SchemaObject.minLength"
      );
      noSupport(
        val.pattern,
        "不支持 SchemaObject 不为string类型 使用 SchemaObject.pattern"
      );
    }
    if (val.type !== "array") {
      noSupport(
        val.maxItems,
        "不支持 SchemaObject 不为 array 类型 使用 SchemaObject.maxItems"
      );
      noSupport(
        val.minItems,
        "不支持 SchemaObject 不为 array 类型 使用 SchemaObject.minItems"
      );
      noSupport(
        val.uniqueItems,
        "不支持 SchemaObject 不为 array 类型 使用 SchemaObject.uniqueItems"
      );
      noSupport(
        val.items,
        "不支持 SchemaObject 不为 array 类型 使用 SchemaObject.items"
      );
    }
    if (val.type !== "object") {
      noSupport(
        val.maxProperties,
        "不支持 SchemaObject 不为 object 类型 使用 SchemaObject.maxProperties"
      );
      noSupport(
        val.minProperties,
        "不支持 SchemaObject 不为 object 类型 使用 SchemaObject.minProperties"
      );
      noSupport(
        val.required,
        "不支持 SchemaObject 不为 object 类型 使用 SchemaObject.required"
      );
      noSupport(
        val.properties,
        "不支持 SchemaObject 不为 object 类型 使用 SchemaObject.properties"
      );
      noSupport(
        val.additionalProperties,
        "不支持 SchemaObject 不为 object 类型 使用 SchemaObject.additionalProperties"
      );
    }
    // if (val.type === undefined) {
    //   noSupport(!val.enum, "SchemaObject 不定义 type 类型 必须定义enum");
    // }

    return val as StaticSchemaObject;
  }

  typescript(): SchemaObjectClassReturnType {
    const data = this.validate();
    // 如果不是支持的类型就原样输出
    // 目的是支持泛型的能力
    let dataType = data.type || "unknown";
    let comment = `
/**
${tag` * @title ${data.title}\n`}\
${tag` * @description ${data.description}\n`}\
${tag` * @readOnly ${data.readOnly}\n`}\
 */
    `.trim();
    if (data.$ref !== undefined) {
      dataType = ReferenceObject({
        $ref: data.$ref,
      }); // 从 Ref 中 取出 可行的key
    } else {
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
            if (Array.isArray(data.items)) {
              // [ A, B, C, D ]
              let subType = data.items.map((v) => {
                return new SchemaObjectClass(v).typescript();
              });
              dataType = subType.map((v) => v.dataType).join(", ");
            } else {
              let subType = new ItemsObjectClass(data.items).typescript();
              dataType = `Array<${subType.dataType}>`;
            }
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
              data.additionalProperties
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
              const isReadOnly = data.properties[propsName].readOnly
                ? "readonly "
                : "";
              const subType = new SchemaObjectClass(
                data.properties[propsName]
              ).typescript();
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
    }

    return {
      dataType,
      comment,
    };
  }

  javascript() {}
}

export function rewriteSchemaObjectType(
  type: string,
  obj: OpenAPIV2.SchemaObject
) {
  return {
    type,
    // comment
    title: obj.title,
    description: obj.description,
    readOnly: obj.readOnly,
  };
}
