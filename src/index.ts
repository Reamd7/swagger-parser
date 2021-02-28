import "./console";
import fs = require("fs");
import DefinitionsObjectClass from "./lib/DefinitionsObject";
import PathItemObject, { PathsObjectEach } from "./lib/PathItemObject";
import GetSwaggerJSON from "./util/GetSwaggerJSON";
import { Document } from "./base";
import prettier = require("prettier");

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

// http://localhost:8008/api/v2/api-docs
GetSwaggerJSON("C:/Users/Gemini/Desktop/myapp/src/api/index.ts.json").then(
  (buf) => {
    const data = JSON.parse(buf.toString()) as Document;

    const defined = new DefinitionsObjectClass(data).typescript();
    console.log(JSON.stringify(defined.changeTemplateType));

    // const needSplitFile = false;
    const needSplitFile = "./@base";
    const source = `
    ${baseInfo}
    const host = "${data.host}"
    const basePath = "${data.basePath}"
    export function apiRequest<T>(data:any) {}
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
