import type { InfoObject } from "../../base";
import tag from "../../util/tag";
import { ContactObject } from "./ContactObject";
import { LicenseObject } from "./LicenseObject";
export function InfoObject(obj: InfoObject) {
  return (
    `/**
   * @title ${obj.title}
   ${tag` * @description ${obj.description}`}
   */` +
    ContactObject(obj.contact) +
    LicenseObject(obj.license)
  );
}
