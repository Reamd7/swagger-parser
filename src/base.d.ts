type XRecord = {};

export type ReferenceObject = {
  $ref?: string;
};

/**
 * Contact information for the exposed API.
 */
export type ContactObject = {
  /**
   * The identifying name of the contact person/organization.
   */
  name?: string;
  /**
   * The URL pointing to the contact information. MUST be in the format of a URL.
   */
  url?: string;
  /**
   * The email address of the contact person/organization. MUST be in the format of an email address.
   */
  email?: string;
} & XRecord;

/**
 * License information for the exposed API.
 */
export type LicenseObject = {
  /**
   * Required. The license name used for the API.
   */
  name: string;
  /**
   * A URL to the license used for the API. MUST be in the format of a URL.
   */
  url?: string;
} & XRecord;
/**
 * The object provides metadata about the API. The metadata can be used by the clients if needed, and can be presented in the Swagger-UI for convenience.
 */
export type InfoObject = {
  /**
   * Required. The title of the application.
   */
  title: string;
  /**
   * A short description of the application. GFM syntax can be used for rich text representation.
   */
  description?: string;
  /**
   * 	The Terms of Service for the API.
   */
  termsOfService?: string;
  /**
   * The contact information for the exposed API.
   */
  contact?: ContactObject;
  /**
   * The license information for the exposed API.
   */
  license?: LicenseObject;
  /**
   * Required Provides the version of the application API (not to be confused with the specification version).
   */
  version: string;
} & XRecord;

export type MimeTypes = string[];

/**
 * Allows referencing an external resource for extended documentation.
 */
export type ExternalDocumentationObject = {
  /**
   * A short description of the target documentation. GFM syntax can be used for rich text representation.
   */
  description?: string;
  /**
   * Required. The URL for the target documentation. Value MUST be in the format of a URL.
   */
  url: string;
} & XRecord;

/**
 * A metadata object that allows for more fine-tuned XML model definitions.
 *
 * When using arrays, XML element names are not inferred (for singular/plural forms) and the name property should be used to add that information. See examples for expected behavior.
 */
export type XMLObject = {
  /**
   * 	Replaces the name of the element/attribute used for the described schema property. When defined within the Items Object (items), it will affect the name of the individual XML elements within the list. When defined alongside type being array (outside the items), it will affect the wrapping element and only if wrapped is true. If wrapped is false, it will be ignored.
   */
  name?: string;
  /**
   * 	The URL of the namespace definition. Value SHOULD be in the form of a URL.
   */
  namespace?: string;
  /**
   * 	The prefix to be used for the name.
   */
  prefix?: string;
  /**
   * 	Declares whether the property definition translates to an attribute instead of an element. Default value is false.
   */
  attribute?: boolean;
  /**
   * 	MAY be used only for an array definition. Signifies whether the array is wrapped (for example, <books><book/><book/></books>) or unwrapped (<book/><book/>). Default value is false. The definition takes effect only when defined alongside type being array (outside the items).
   */
  wrapped?: boolean;
} & XRecord;

export type ItemsObject = {
  /**
   * // 联合类型 A | B | C // TODO 支持
   */
  enum?: any[];
} & ReferenceObject &
  (
    | {
        // 整数类型
        type?: "integer";
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
        type?: "number";
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
        type?: "string";
        format?: "byte" | "binary" | "date" | "password" | "date-time";

        maxLength?: number; // 字符串最大长度
        minLength?: number; // 字符串最小长度
        pattern?: string; // 字符串匹配正则表达式
      }
    | {
        type?: "array";
        // type array 校验
        maxItems?: number; // 数组最大items数
        minItems?: number; // 数组最小items数
        uniqueItems?: boolean; // 数组中每个items都必须是唯一的
        // items?: OpenAPIV2.ItemsObject | OpenAPIV2.ItemsObject[];
        items?: ItemsObject;
        /**
         * Determines the format of the array if type array is used. Possible values are:
         * csv - comma separated values foo,bar.
         * ssv - space separated values foo bar.
         * tsv - tab separated values foo\tbar.
         * pipes - pipe separated values foo|bar.
         */
        collectionFormat?: "csv" | "ssv" | "tsv" | "pipes";
      }
    | {
        type?: "boolean";
      }
  );

export type SchemaObject = {
  /**
   * Adds support for polymorphism. The discriminator is the schema property name that is used to differentiate between other schema that inherit this schema. The property name used MUST be defined at this schema and it MUST be in the required property list. When used, the value MUST be the name of this schema or any schema that inherits it.
   */
  discriminator?: string;
  /**
   * Relevant only for Schema "properties" definitions. Declares the property as "read only". This means that it MAY be sent as part of a response but MUST NOT be sent as part of the request. Properties marked as readOnly being true SHOULD NOT be in the required list of the defined schema. Default value is false.
   */
  readOnly?: boolean;
  /**
   * This MAY be used only on properties schemas. It has no effect on root schemas. Adds Additional metadata to describe the XML representation format of this property.
   */
  xml?: XMLObject;
  /**
   * Additional external documentation for this schema.
   */
  externalDocs?: ExternalDocumentationObject;
  /**
   * A free-form property to include an example of an instance for this schema.
   */
  example?: any;
  // ---------------------------------------------------------------

  title?: string;
  description?: string;
  /**
   * 必须对其中所有定义都有效
   */
  allOf?: SchemaObject[];
  /**
   * 联合类型 A | B | C // TODO 支持
   */
  enum?: any[];
  $ref?: string;
  default?: any;
} & (
  | { type?: "null" }
  | {
      // 整数类型
      type?: "integer";
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
      type?: "number";
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
      type?: "string";
      format?: "byte" | "binary" | "date" | "password" | "date-time";

      maxLength?: number; // 字符串最大长度
      minLength?: number; // 字符串最小长度
      pattern?: string; // 字符串匹配正则表达式
    }
  | {
      type?: "array";
      // type array 校验
      maxItems?: number; // 数组最大items数
      minItems?: number; // 数组最小items数
      uniqueItems?: boolean; // 数组中每个items都必须是唯一的
      // items?: OpenAPIV2.SchemaObject | OpenAPIV2.SchemaObject[];
      items?: ItemsObject;
    }
  | {
      type?: "object";
      // type object 校验
      maxProperties?: number; // object最大props数
      minProperties?: number; // object最小props数
      required?: string[]; // 必须props属性
      properties?: {
        [name: string]: SchemaObject;
      };
      additionalProperties?: boolean | SchemaObject; // 是否支持 [index: string] : XXX类型；
    }
  | {
      type?: "boolean";
    }
) &
  XRecord;
// -----------------------------------------------

export type DefinitionsObject = Record<string, SchemaObject>

export interface Document {
  /**
   * 	Required. Specifies the Swagger Specification version being used. It can be used by the Swagger UI and other clients to interpret the API listing. The value MUST be "2.0".
   */
  swagger: "2.0";
  /**
   * 	Required. Provides metadata about the API. The metadata can be used by the clients if needed.
   */
  info: InfoObject;
  /**
   * The host (name or ip) serving the API. This MUST be the host only and does not include the scheme nor sub-paths. It MAY include a port. If the host is not included, the host serving the documentation is to be used (including the port). The host does not support path templating.
   */
  host?: string;
  /**
   * The base path on which the API is served, which is relative to the host. If it is not included, the API is served directly under the host. The value MUST start with a leading slash (/). The basePath does not support path templating.
   */
  basePath?: string;
  /**
   * The transfer protocol of the API. Values MUST be from the list: "http", "https", "ws", "wss". If the schemes is not included, the default scheme to be used is the one used to access the Swagger definition itself.
   */
  schemes?: Array<"http" | "https" | "ws" | "wss">;
  consumes?: MimeTypes;
  produces?: MimeTypes;

  definitions?: DefinitionsObject;
  externalDocs?: ExternalDocumentationObject;
}
