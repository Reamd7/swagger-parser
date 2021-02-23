import "./console";
import fs = require("fs");
import DefinitionsObjectClass from "./lib/DefinitionsObject";
import GetSwaggerJSON from "./util/GetSwaggerJSON";
import { OpenAPIV2 } from "./openapi";
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

GetSwaggerJSON("http://localhost:8008/api/v2/api-docs").then((buf) => {
  const data = JSON.parse(buf.toString()) as OpenAPIV2.Document;

  fs.writeFileSync(
    "./dist/out.ts",
    `
    ${baseInfo}
    ${new DefinitionsObjectClass(data.definitions).typescript().dataType}
    `
  );
});
