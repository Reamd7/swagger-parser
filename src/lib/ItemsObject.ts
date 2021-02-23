import type { OpenAPIV2 } from "../openapi";
import noSupport from "../util/noSupport";
import ReferenceObject from "./ReferenceObject";

// type JSONItemType =
//   | "string"
//   | "integer"
//   | "number"
//   | "array"
//   | "boolean"

type ItemsObject_MetaPart = {
  enum?: any[]; // 联合类型 A | B | C // TODO 支持
  // $ref?: string;
} & OpenAPIV2.ReferenceObject;

export type StaticItemsObject = ItemsObject_MetaPart &
  (
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
        // items?: OpenAPIV2.ItemsObject | OpenAPIV2.ItemsObject[];
        items?: OpenAPIV2.ItemsObject;
      }
    | {
        type: "boolean";
      }
  );

export interface ItemsObjectClassReturnType {
  dataType: string;
  comment: string;
}

/**
 * 基于规范
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#ItemsObject
 * type: "string" "number" "integer" "boolean" "array"
 * ItemsObject 除了规范中定义的属性，在 typescript 中也包含了 $ref 属性
 * 实际生成的情况也有 $ref 所以，这里 ItemsObject 也需要包含
 */
export default class ItemsObjectClass {
  private readonly val: OpenAPIV2.ItemsObject;
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
  constructor(val: OpenAPIV2.ItemsObject) {
    this.val = val;
  }

  validate(): StaticItemsObject {
    const Format2Type = ItemsObjectClass.Format2Type;
    const val = this.val;
    noSupport(val.default, "暂时不支持 ItemsObject.default");
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

    if (val.type !== "integer" && val.type !== "number") {
      noSupport(
        val.multipleOf,
        "不支持 ItemsObject 不为数字类型 使用 ItemsObject.multipleOf"
      );
      noSupport(
        val.maximum,
        "不支持 ItemsObject 不为数字类型 使用 ItemsObject.maximum"
      );
      noSupport(
        val.exclusiveMaximum,
        "不支持 ItemsObject 不为数字类型 使用 ItemsObject.exclusiveMaximum"
      );
      noSupport(
        val.minimum,
        "不支持 ItemsObject 不为数字类型 使用 ItemsObject.minimum"
      );
      noSupport(
        val.exclusiveMinimum,
        "不支持 ItemsObject 不为数字类型 使用 ItemsObject.exclusiveMinimum"
      );
    }
    if (val.type !== "string") {
      noSupport(
        val.maxLength,
        "不支持 ItemsObject 不为string类型 使用 ItemsObject.maxLength"
      );
      noSupport(
        val.minLength,
        "不支持 ItemsObject 不为string类型 使用 ItemsObject.minLength"
      );
      noSupport(
        val.pattern,
        "不支持 ItemsObject 不为string类型 使用 ItemsObject.pattern"
      );
    }
    if (val.type !== "array") {
      noSupport(
        val.maxItems,
        "不支持 ItemsObject 不为 array 类型 使用 ItemsObject.maxItems"
      );
      noSupport(
        val.minItems,
        "不支持 ItemsObject 不为 array 类型 使用 ItemsObject.minItems"
      );
      noSupport(
        val.uniqueItems,
        "不支持 ItemsObject 不为 array 类型 使用 ItemsObject.uniqueItems"
      );
      noSupport(
        val.items,
        "不支持 ItemsObject 不为 array 类型 使用 ItemsObject.items"
      );
    }
    // if (val.type === undefined) {
    //   noSupport(!val.enum, "ItemsObject 不定义 type 类型 必须定义enum");
    // }

    return val as StaticItemsObject;
  }

  typescript(): ItemsObjectClassReturnType {
    const data = this.validate();
    let dataType = "unknown";
    let comment = ``;

    if (data.$ref !== undefined) {
      dataType = ReferenceObject({
        $ref: data.$ref,
      });
    } else {
      switch (data.type) {
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
            // 支持 OpenAPIV2.ItemsObject[] 类型的，=> [ A, B, C, D ]
            if (Array.isArray(data.items)) { 
              let subType = data.items.map((v) => {
                return new ItemsObjectClass(v).typescript();
              });
              dataType = subType.map((v) => v.dataType).join(", ");
            } else {
              // 支持 OpenAPIV2.ItemsObject 类型的，=> Array<T>
              let subType = new ItemsObjectClass(data.items).typescript();
              dataType = `Array<${subType.dataType}>`;
            }
          } else {
            dataType = "Array<unknown>";
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
