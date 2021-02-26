import "./console";
import fs = require("fs");
import DefinitionsObjectClass from "./lib/DefinitionsObject";
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

GetSwaggerJSON("http://localhost:8008/api/v2/api-docs").then((buf) => {
  const data = JSON.parse(buf.toString()) as Document;

  fs.writeFileSync(
    "./dist/out.ts",
    prettier.format(
      `
    ${baseInfo}
    ${new DefinitionsObjectClass(data).typescript().dataType}
    `,
      {
        parser: "babel-ts",
      }
    )
  );
});
