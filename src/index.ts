import "./console";
import fs = require("fs");
import DefinitionsObjectClass from "./lib/DefinitionsObject";
import PathItemObject, { PathsObjectEach } from "./lib/PathItemObject";
import GetSwaggerJSON from "./util/GetSwaggerJSON";
import { Document } from "./base";
import prettier = require("prettier");

const baseInfo = `
type int32 = number;
type int64 = number;
type float = number;
type double = number;
type byte = string;
type binary = string;
type date = string;
type datetime = string;
type password = string;
`;
const needFormat = false;
// http://localhost:8008/api/v2/api-docs
GetSwaggerJSON("C:/Users/Gemini/Desktop/myapp/src/api/index.ts.json").then(
  (buf) => {
    const data = JSON.parse(buf.toString()) as Document;

    const defined = new DefinitionsObjectClass(data).typescript();
    console.log(JSON.stringify(defined.changeTemplateType));
    const source = `
    ${baseInfo}
    const host = "${data.host}"
    const basePath = "${data.basePath}"
    function apiRequest<T>(data:any) {}
    ${defined.dataType}

    ${PathsObjectEach(
      PathItemObject(data.paths, data, false),
      (key, value) => value
    ).join("\n")}
    `;
    fs.writeFileSync(
      "./dist/out.ts",
      needFormat
        ? prettier.format(source, {
            parser: "babel-ts",
          })
        : source
    );
  }
);
