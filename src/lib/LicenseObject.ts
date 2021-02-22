import { OpenAPIV2 } from "../openapi";
import tag from "../util/tag";
export function LicenseObject(obj?: OpenAPIV2.LicenseObject) {
  if (obj) {
    return `/** @license ${obj.name} ${tag` ${obj?.url}`} */`;
  } else {
    return "";
  }
}
