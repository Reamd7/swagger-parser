import { OpenAPIV2 } from "../openapi";
import tag from "../util/tag";
export function ContactObject(obj?: OpenAPIV2.ContactObject) {
  if (
    obj !== undefined &&
    (obj.email !== undefined || obj.url !== undefined || obj.name !== undefined)
  ) {
    return `/**
${
  obj.name || obj.email
    ? " * @author" +
      (obj.name ? " " + obj.name : "") +
      (obj.email ? " " + obj.email : "")
    : ""
}
${tag` * ${obj.url}`}
     */`;
  } else {
    return "";
  }
}
