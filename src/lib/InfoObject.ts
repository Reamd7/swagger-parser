import { OpenAPIV2 } from "../openapi";
import tag from "../util/tag";
import { ContactObject } from "./ContactObject";
import { LicenseObject } from "./LicenseObject";
export function InfoObject(obj: OpenAPIV2.InfoObject) {
  return (
    `/**
   * @title ${obj.title}
   ${tag` * @description ${obj.description}`}
   */` +
    ContactObject(obj.contact) +
    LicenseObject(obj.license)
  );
}
