import fs = require("fs");
import fetch from "node-fetch";
import isURL = require("is-url");

export default function GetSwaggerJSON(path: string) {
  return new Promise<Buffer>((resolve, rejects) => {
    if (isURL(path)) {
      fetch(path).then((val) => {
        if (val.ok) {
          val.buffer().then((res) => {
            resolve(res);
          });
        } else {
          rejects(val);
        }
      });
    } else {
      resolve(fs.readFileSync(path));
    }
  });
}
