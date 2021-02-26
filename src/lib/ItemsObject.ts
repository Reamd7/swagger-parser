import type { Document, Items, ItemsObject, SchemaObject } from "../base";
import ReferenceObjectClass from "./ReferenceObject";
import { isReferenceObject } from "./ReferenceObject";

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
  private base: Document;
  private readonly val: ItemsObject;
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
  constructor(val: ItemsObject, base: Document) {
    this.val = val;
    this.base = base;
  }

  // validate(): StaticItemsObject {
  //   const Format2Type = ItemsObjectClass.Format2Type;
  //   const val = this.val;
  //   noSupport(val.default, "暂时不支持 ItemsObject.default");
  //   // format
  //   // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat
  //   if (val.format) {
  //     if (!(val.format in Format2Type)) {
  //       noSupport(`不支持 format => ${val.format}`);
  //     } else if (Format2Type[val.format] !== val.type) {
  //       noSupport(
  //         `根据 format => ${val.format}, type 应为 ${
  //           Format2Type[val.format]
  //         }, 现在为${val.type}`
  //       );
  //     }
  //   }

  //   if (val.type !== "integer" && val.type !== "number") {
  //     noSupport(
  //       val.multipleOf,
  //       "不支持 ItemsObject 不为数字类型 使用 ItemsObject.multipleOf"
  //     );
  //     noSupport(
  //       val.maximum,
  //       "不支持 ItemsObject 不为数字类型 使用 ItemsObject.maximum"
  //     );
  //     noSupport(
  //       val.exclusiveMaximum,
  //       "不支持 ItemsObject 不为数字类型 使用 ItemsObject.exclusiveMaximum"
  //     );
  //     noSupport(
  //       val.minimum,
  //       "不支持 ItemsObject 不为数字类型 使用 ItemsObject.minimum"
  //     );
  //     noSupport(
  //       val.exclusiveMinimum,
  //       "不支持 ItemsObject 不为数字类型 使用 ItemsObject.exclusiveMinimum"
  //     );
  //   }
  //   if (val.type !== "string") {
  //     noSupport(
  //       val.maxLength,
  //       "不支持 ItemsObject 不为string类型 使用 ItemsObject.maxLength"
  //     );
  //     noSupport(
  //       val.minLength,
  //       "不支持 ItemsObject 不为string类型 使用 ItemsObject.minLength"
  //     );
  //     noSupport(
  //       val.pattern,
  //       "不支持 ItemsObject 不为string类型 使用 ItemsObject.pattern"
  //     );
  //   }
  //   if (val.type !== "array") {
  //     noSupport(
  //       val.maxItems,
  //       "不支持 ItemsObject 不为 array 类型 使用 ItemsObject.maxItems"
  //     );
  //     noSupport(
  //       val.minItems,
  //       "不支持 ItemsObject 不为 array 类型 使用 ItemsObject.minItems"
  //     );
  //     noSupport(
  //       val.uniqueItems,
  //       "不支持 ItemsObject 不为 array 类型 使用 ItemsObject.uniqueItems"
  //     );
  //     noSupport(
  //       val.items,
  //       "不支持 ItemsObject 不为 array 类型 使用 ItemsObject.items"
  //     );
  //   }
  //   // if (val.type === undefined) {
  //   //   noSupport(!val.enum, "ItemsObject 不定义 type 类型 必须定义enum");
  //   // }

  //   return val as StaticItemsObject;
  // }

  typescript(): ItemsObjectClassReturnType {
    const data = this.val;
    let dataType = data.type || "unknown";
    let comment = ``;

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
          // 支持 ItemsObject[] 类型的，=> [ A, B, C, D ]
          if (Array.isArray(data.items)) {
            let subType = data.items.map((v) => {
              return new ItemsClass(v, this.base).typescript();
            });
            dataType = subType.map((v) => v.dataType).join(", ");
          } else {
            // 支持 ItemsObject 类型的，=> Array<T>
            let subType = new ItemsClass(data.items, this.base).typescript();
            dataType = `Array<${subType.dataType}>`;
          }
        } else {
          dataType = "Array<unknown>";
        }
        break;
    }

    return {
      dataType,
      comment,
    };
  }

  javascript() {}
}

export class ItemsClass {
  private readonly val: Items;
  private _class: ItemsObjectClass | null = null;
  protected _rawRef: ReferenceObjectClass<
    Omit<SchemaObject, "$ref">
  > | null = null;
  private base: Document;
  constructor(val: Items, base: Document) {
    this.val = val;
    this.base = base;
    if (isReferenceObject(this.val)) {
      this._rawRef = new ReferenceObjectClass<Omit<SchemaObject, "$ref">>(
        {
          $ref: this.val.$ref,
        },
        this.base
      );
    } else {
      this._class = new ItemsObjectClass(this.val, this.base);
    }
  }

  typescript(): ItemsObjectClassReturnType {
    const data = this.val;
    let dataType = "unknown";
    let comment = ``;

    if (isReferenceObject(data)) {
      dataType = this._rawRef!.Objectkey;
    } else {
      return this._class!.typescript();
    }
    return {
      dataType,
      comment,
    };
  }

  javascript() {}
}
