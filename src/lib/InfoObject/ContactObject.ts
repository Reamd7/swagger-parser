import type { ContactObject } from "../../base";
import tag from "../../util/tag";
export function ContactObject(obj?: ContactObject) {
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
