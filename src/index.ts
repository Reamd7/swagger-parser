import "./console";
import fs = require("fs");
import path = require("path");
import DefinitionsObjectClass from "./lib/DefinitionsObject";
import PathItemObject, { methodList, PathsObjectEach } from "./lib/PathItemObject";
import GetSwaggerJSON from "./util/GetSwaggerJSON";
import { Document } from "./base";
import prettier = require("prettier");
import { In } from "./lib/PathItemObject/OperationObject";

const baseInfo = `
export type int32 = number;
export type int64 = number;
export type float = number;
export type double = number;
export type byte = string;
export type binary = string;
export type date = string;
export type datetime = string;
export type password = string;
`;
const needFormat = true;

function OutPutFile(source: string, file: string) {
  return fs.writeFileSync(
    file,
    needFormat
      ? prettier.format(source, {
          parser: "babel-ts",
        })
      : source
  );
}

// function template() {

// }
// /**
//  * @param uri 文件路径，支持URL 和 本地文件路径
//  * @param needSplitFile 是否将他分割输出
//  */
// function ParserSwagger(
//   uri: string, 
//   outFile: string,
//   needSplitFile: boolean = true,
// ) {
//   const info = path.parse(outFile);
//   const { dir, base } = info
  
// }

// http://localhost:8008/api/v2/api-docs
GetSwaggerJSON("C:/Users/Gemini/Desktop/myapp/src/api/index.ts.json").then(
  (buf) => {
    const data = JSON.parse(buf.toString()) as Document;

    const defined = new DefinitionsObjectClass(data).typescript();

    // const needSplitFile = false;
    const needSplitFile = "./@base";
    const source = `
    import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
    const host = "${data.host}"
    const basePath = "${data.basePath}"
    interface apiRequestParams {
      url: string;
      method: ${methodList.map(v => `"${v}"`).join(" | ")};
      accept: string;
      contentType: string;
      params: Partial<Record<${In.map(v => `"${v}"`).join(" | ")}, any>>
    }
    export interface ApiResponse<status extends number, T> {
      data: T;
      status: status;
      statusText: string;
      headers: any;
      config: AxiosRequestConfig;
      request?: any;
    }
    
    const axiosInstance = axios.create({
      baseURL: "${data.host}${data.basePath}",
    });
    
    export function apiRequest<T extends AxiosResponse<any>>(data: apiRequestParams) {
      let url = data.url;
      // path
      if (data.params.path) {
        for (const key in data.params.path) {
          if (Object.prototype.hasOwnProperty.call(data.params.path, key)) {
            const element = data.params.path[key];
            if (element !== undefined) {
              url.replace(new RegExp('\\{\\s.*' + key +'\\s.*\\}', "g"), element.toString())
            }
          }
        }
      }
      // header
      const headers = data.params.header || {};
      if (data.accept) {
        headers['accept'] = data.accept
      }
      if (data.contentType) {
        headers['content-type'] = data.contentType
      }
      // post data
      let __data__ = data.params.formData || data.params.body
      return axiosInstance.request<any, T>({
        url: data.url,
        method: data.method === "del" ? "delete" : data.method,
        params: data.params.query,
        headers: headers,
        data: __data__
      });
    }
    ${baseInfo}
    ${defined.dataType}
    ${PathsObjectEach(
      PathItemObject(data.paths, data, needSplitFile),
      (key, value) => {
        if (needSplitFile) {
          OutPutFile(value, `./dist/${key}.ts`);
          return "";
        } else {
          return value;
        }
      }
    ).join("\n")}
    `;

    OutPutFile(source, "./dist/@base.ts");
  }
);
