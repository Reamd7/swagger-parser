// TODO 仔细针对 ReferenceObject 进行处理，因为规范 和 具体实现有点不一样

type IntDataFormat = "int32" | "int64";
type numberDataFormat = "float" | "double";
type StringDataFormat = "byte" | "binary" | "date" | "password" | "date-time";
type BasecollectionFormat = "csv" | "ssv" | "tsv" | "pipes";
type queryOrformDataCollectionFormat = BasecollectionFormat | "multi";
type NullObject = {};
type XRecord = {};
// ---------------------------------------------------------
export type ReferenceObject = {
  $ref: string;
};
export type MimeTypes = string[];
// ------------------------- InfoObject --------------------------------
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
// ----------------------- ExternalDocumentationObject ------------------
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
// ------------------------ XMLObject -----------------------------------
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
// ------------------------- ItemsObject ---------------------------------
export type Items = ReferenceObject | ItemsObject;
export type ItemsObject = {
  /**
   * // 联合类型 A | B | C // TODO 支持
   */
  enum?: any[];

  default?: any;
} & (
  | {
      // 整数类型
      type?: "integer";
      format?: IntDataFormat;

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
      format?: numberDataFormat;

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
      format?: StringDataFormat;

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
      items?: Items;
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

// ------------------------- SchemaObject ---------------------------------
// ✔
/**
 * 用于
 * - Response Object, schema
 * - Definitions Object
 * - Parameter Object in body => schema
 */
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
  $ref?: ReferenceObject['$ref']; // 这里是规范定义的哟
  default?: any;
} & (
  | { type?: "null" }
  | {
      // 整数类型
      type?: "integer";
      format?: IntDataFormat;

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
      format?: numberDataFormat;

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
      format?: StringDataFormat;

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
      items?: Items;
      collectionFormat?: BasecollectionFormat;
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
// --------------------------------------------------------

type ParameterItemObject<
  T extends "query" | "header" | "path" | "formData" | "body"
> = ParameterMetaObject<T> &
  (
    | {
        // 整数类型
        type?: "integer";
        format?: IntDataFormat;

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
        format?: numberDataFormat;

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
        format?: StringDataFormat;

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
         * 	Determines the format of the array if type array is used. Possible values are:
         * csv - comma separated values foo,bar.
         * ssv - space separated values foo bar.
         * tsv - tab separated values foo\tbar.
         * pipes - pipe separated values foo|bar.
         * multi - corresponds to multiple parameter instances instead of multiple values for a single instance foo=bar&foo=baz. This is valid only for parameters in "query" or "formData".
         * Default value is csv.
         */
        collectionFormat?: T extends "query" | "formData"
          ? queryOrformDataCollectionFormat
          : BasecollectionFormat;
      }
    | {
        type?: "boolean";
      }
    | {
        type?: T extends "formData" ? "file" : never;
      }
  );
type ParameterMetaObject<
  T extends "query" | "header" | "path" | "formData" | "body"
> = {
  /**
   * Required. The name of the parameter. Parameter names are case sensitive.
   * If in is "path", the name field MUST correspond to the associated path segment from the path field in the Paths Object. See Path Templating for further information.
   * For all other cases, the name corresponds to the parameter name used based on the in property.
   */
  name: string;
  /**
   * A brief description of the parameter. This could contain examples of use. GFM syntax can be used for rich text representation.
   */
  description?: string;
  /**
   * Determines whether this parameter is mandatory. If the parameter is in "path", this property is required and its value MUST be true. Otherwise, the property MAY be included and its default value is false.
   */
  required?: boolean;
  // --------------------------------------------
  default?: any;
  /**
   * // 联合类型 A | B | C // TODO 支持
   */
  enum?: any[];
  allowEmptyValue?: T extends "query" | "formData" ? boolean : never;
};
export type ParameterObject = XRecord &
  (
    | ({
        in: "body";
        /**
         * Required. The schema defining the type used for the body parameter.
         */
        schema: SchemaObject;
      } & ParameterItemObject<"body">)
    | ({
        /**
         * Required. The location of the parameter. Possible values are "query", "header", "path", "formData" or "body".
         */
        in: "path";
        required: true;
      } & ParameterItemObject<"path">)
    | ({
        in: "query";
      } & ParameterItemObject<"query">)
    | ({
        in: "formData";
      } & ParameterItemObject<"formData">)
    | ({
        in: "header";
      } & ParameterItemObject<"header">)
  );
export type Parameter = ReferenceObject | ParameterObject;
// -----------------------------------------------
type HeaderObject = ItemsObject;
type HeadersObject = Record<string, HeaderObject>;
type ExampleObject = Record<string, any>;

export type ResponseObject = {
  description: string;
  schema?: SchemaObject;
  headers?: HeadersObject;
  examples?: ExampleObject;
} & XRecord;
type Response = ResponseObject | ReferenceObject;

// type HTTPStatusCode =
//   | `10${"0" | "1" | "2"}`
//   | `20${"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7"}`
//   | `30${"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7"}`
//   | `40${"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"}`
//   | `41${"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"}`
//   | `42${"1" | "2" | "3" | "4" | "5" | "6"}`
//   | "449"
//   | "451"
//   | `50${"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"}`
//   | `510`
//   | `600`;
type HTTPStatusCode = `${"1" | "2" | "3" | "4" | "5" | "6"}${
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"}${"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"}`;

type ResponsesObject = {
  [key in HTTPStatusCode]: Response;
} &
  XRecord & {
    default?: Response;
  };

// -----------------------------------------------
type Parameters = Parameter[];
type OperationObject = {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
  operationId?: string;
  consumes?: MimeTypes;
  produces?: MimeTypes;
  parameters?: Parameters;
  responses: ResponsesObject;
  schemes?: string[];
  deprecated?: boolean;
  // security?: SecurityRequirementObject[];
};

interface PathItemObject {
  $ref?: string;
  get?: OperationObject;
  put?: OperationObject;
  post?: OperationObject;
  del?: OperationObject;
  delete?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
  parameters?: Parameters;
}
// -----------------------------------------------

export type TagObject = {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
} & XRecord;

export type DefinitionsObject = Record<string, SchemaObject>;

export type ParametersDefinitionsObject = Record<string, ParameterObject>;

export type ResponsesDefinitionsObject = Record<string, ResponseObject>;

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

  tags?: TagObject[];
  // 暂时不知道有什么情况用到
  parameters?: ParametersDefinitionsObject;
  responses?: ResponsesDefinitionsObject;
}
