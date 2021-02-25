import type { LicenseObject } from "../../base";
import tag from "../../util/tag";
export function LicenseObject(obj?: LicenseObject) {
  if (obj) {
    return `/** @license ${obj.name} ${tag` ${obj?.url}`} */`;
  } else {
    return "";
  }
}
