export declare namespace OpenAPIV2 {
  interface Document<T extends {} = {}> {
    basePath?: string;
    consumes?: MimeTypes;
    definitions?: DefinitionsObject;
    externalDocs?: ExternalDocumentationObject;
    host?: string;
    info: InfoObject;
    parameters?: ParametersDefinitionsObject;
    paths: PathsObject<T>;
    produces?: MimeTypes;
    responses?: ResponsesDefinitionsObject;
    schemes?: string[];
    security?: SecurityRequirementObject[];
    securityDefinitions?: SecurityDefinitionsObject;
    swagger: string;
    tags?: TagObject[];
    "x-express-openapi-additional-middleware"?: (
      | ((request: any, response: any, next: any) => Promise<void>)
      | ((request: any, response: any, next: any) => void)
    )[];
    "x-express-openapi-validation-strict"?: boolean;
  }
  interface TagObject {
    name: string;
    description?: string;
    externalDocs?: ExternalDocumentationObject;
  }
  interface SecuritySchemeObjectBase {
    type: "basic" | "apiKey" | "oauth2";
    description?: string;
  }
  interface SecuritySchemeBasic extends SecuritySchemeObjectBase {
    type: "basic";
  }
  interface SecuritySchemeApiKey extends SecuritySchemeObjectBase {
    type: "apiKey";
    name: string;
    in: string;
  }
  type SecuritySchemeOauth2 =
    | SecuritySchemeOauth2Implicit
    | SecuritySchemeOauth2AccessCode
    | SecuritySchemeOauth2Password
    | SecuritySchemeOauth2Application;
  interface ScopesObject {
    [index: string]: any;
  }
  interface SecuritySchemeOauth2Base extends SecuritySchemeObjectBase {
    type: "oauth2";
    flow: "implicit" | "password" | "application" | "accessCode";
    scopes: ScopesObject;
  }
  interface SecuritySchemeOauth2Implicit extends SecuritySchemeOauth2Base {
    flow: "implicit";
    authorizationUrl: string;
  }
  interface SecuritySchemeOauth2AccessCode extends SecuritySchemeOauth2Base {
    flow: "accessCode";
    authorizationUrl: string;
    tokenUrl: string;
  }
  interface SecuritySchemeOauth2Password extends SecuritySchemeOauth2Base {
    flow: "password";
    tokenUrl: string;
  }
  interface SecuritySchemeOauth2Application extends SecuritySchemeOauth2Base {
    flow: "application";
    tokenUrl: string;
  }
  type SecuritySchemeObject =
    | SecuritySchemeBasic
    | SecuritySchemeApiKey
    | SecuritySchemeOauth2;
  interface SecurityDefinitionsObject {
    [index: string]: SecuritySchemeObject;
  }
  interface SecurityRequirementObject {
    [index: string]: string[];
  }
  interface ReferenceObject {
    $ref: string;
  }
  type Response = ResponseObject | ReferenceObject;
  interface ResponsesDefinitionsObject {
    [index: string]: ResponseObject;
  }
  type Schema = SchemaObject | ReferenceObject;
  interface ResponseObject {
    description: string;
    schema?: Schema;
    headers?: HeadersObject;
    examples?: ExampleObject;
  }
  interface HeadersObject {
    [index: string]: HeaderObject;
  }
  interface HeaderObject extends ItemsObject {}
  interface ExampleObject {
    [index: string]: any;
  }
  type OperationObject<T extends {} = {}> = {
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
    security?: SecurityRequirementObject[];
  } & T;
  interface ResponsesObject {
    [index: string]: Response | any;
    default?: Response;
  }
  type Parameters = (ReferenceObject | Parameter)[];
  type Parameter = InBodyParameterObject | GeneralParameterObject;
  type ParameterObject = {
    name: string;
    // in: string;
    // in: "query" | "header" | "path" | "formData" | "body";
    description?: string;
    required?: boolean;   // when in === path, it must be true
    // [index: string]: any; 
  }
  interface InBodyParameterObject extends ParameterObject {
    schema: Schema;
    in: "body"
  }
  interface GeneralParameterObject extends ParameterObject {
    allowEmptyValue?: boolean;
    in: "query" | "header" | "path" | "formData";

    type: string; // "string" | "integer" | "number" | "array" | "boolean"
    format?: string;
    items?: ItemsObject;
    collectionFormat?: "csv" | "ssv" | "tsv" | "pipes" | "multi"; // 默认是 csv
    default?: any;
    maximum?: number;
    exclusiveMaximum?: boolean;
    minimum?: number;
    exclusiveMinimum?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    enum?: any[];
    multipleOf?: number;

    // $ref?: string
  }
  
  interface PathItemObject<T extends {} = {}> {
    $ref?: string;
    get?: OperationObject<T>;
    put?: OperationObject<T>;
    post?: OperationObject<T>;
    del?: OperationObject<T>;
    delete?: OperationObject<T>;
    options?: OperationObject<T>;
    head?: OperationObject<T>;
    patch?: OperationObject<T>;
    parameters?: Parameters;
  }
  interface PathsObject<T extends {} = {}> {
    [index: string]: PathItemObject<T> | any;
  }
  interface ParametersDefinitionsObject {
    [index: string]: Parameter;
  }

  type MimeTypes = string[];
  interface DefinitionsObject {
    [index: string]: SchemaObject;
  }

  interface ExternalDocumentationObject {
    [index: string]: any;
    description?: string;
    url: string;
  }
  type ItemsObject = {
    type: string; // "string" | "integer" | "number" | "array" | "boolean"
    format?: string;
    items?: ItemsObject;
    collectionFormat?: "csv" | "ssv" | "tsv" | "pipes"; // 默认是 csv
    default?: any;
    maximum?: number;
    exclusiveMaximum?: boolean;
    minimum?: number;
    exclusiveMinimum?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    enum?: any[];
    multipleOf?: number;
  } & Partial<ReferenceObject>

  interface XMLObject {
    [index: string]: any;
    name?: string;
    namespace?: string;
    prefix?: string;
    attribute?: boolean;
    wrapped?: boolean;
  }
  interface InfoObject {
    title: string;
    description?: string;
    termsOfService?: string;
    contact?: ContactObject;
    license?: LicenseObject;
    version: string;
  }
  interface ContactObject {
    name?: string;
    url?: string;
    email?: string;
  }
  interface LicenseObject {
    name: string;
    url?: string;
  }


  // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#SchemaObject
  interface SchemaObject extends IJsonSchema {
    // [index: string]: any;
    discriminator?: string;
    readOnly?: boolean;
    xml?: XMLObject;
    externalDocs?: ExternalDocumentationObject;
    example?: any;
    
    // The following properties are taken from the JSON Schema definition but their definitions were adjusted to the Swagger Specification. Their definition is the same as the one from JSON Schema, only where the original definition references the JSON Schema definition, the Schema Object definition is used instead.
    // 如果是 Array<T> | [A, B, C, D] 这里的不同
    // items?: SchemaObject | SchemaObject[]; // 按照规范阅读应该是这个, 因为规范支持 tuple 类型
    items?: ItemsObject;  // 但是typescript 里面改为了ItemsObject , 和 body中的情况保持一致。我在看实际用java生成出来的代码也是这个，也就是说不支持object类型，支持带有 $ref
    properties?: {
      [name: string]: SchemaObject & Partial<ReferenceObject>;
    };
    allOf?: SchemaObject[];
    additionalProperties?: boolean | SchemaObject;
  }
}

export interface IJsonSchema {
  // id?: string;
  // $schema?: string;
  // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat
  format?: string;

  title?: string;
  description?: string;
  default?: any;

  // Validation keywords sorted by instance types
  multipleOf?: number;  // value 是 multipleOf 的倍数
  // x ≥ minimum
  // x > exclusiveMinimum
  // x ≤ maximum
  // x < exclusiveMaximum
  maximum?: number; 
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  // 字符串校验
  maxLength?: number; // 字符串最大长度
  minLength?: number; // 字符串最小长度
  pattern?: string;   // 字符串匹配正则表达式

  // type array 校验
  maxItems?: number;  // 数组最大items数
  minItems?: number;  // 数组最小items数
  uniqueItems?: boolean;  // 数组中每个items都必须是唯一的
  items?: IJsonSchema | IJsonSchema[];

  // type object 校验
  maxProperties?: number; // object最大props数
  minProperties?: number; // object最小props数
  required?: string[];  // 必须props属性
  properties?: {
    [name: string]: IJsonSchema;
  };
  additionalProperties?: boolean | IJsonSchema; // 是否支持 [index: string] : XXX类型；

  enum?: any[]; // 联合类型 A | B | C // TODO 支持
  // type?: string | string[];
  type?: string;
  allOf?: IJsonSchema[]; // 必须对其中所有定义都有效


  // additionalItems?: boolean | IJsonSchema;
  // definitions?: {
  //   [name: string]: IJsonSchema;
  // };
  // patternProperties?: {
  //   [name: string]: IJsonSchema;
  // };
  // dependencies?: {
  //   [name: string]: IJsonSchema | string[];
  // };
  // anyOf?: IJsonSchema[]; // 给定数据必须针对给定子Schema的任何（一个或多个）有效
  // oneOf?: IJsonSchema[]; // 要验证，给定数据必须对给定的子Schema之一有效。oneOf
  // not?: IJsonSchema; // 非
}

type JSONType = "string" | "integer" | "number" | "object" | "array" | "boolean" | "null";

