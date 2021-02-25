import type { ReferenceObject } from "../base";

export const getDefinitionsObjectRef = (key: string) => `#/definitions/${key.replace(/</g, "«").replace(/>/g, "»")}`;
export const getDefinitionsObjectkey = (key: string) => key.substring(14).replace(/«/g, "<").replace(/»/g, ">");

export default function ReferenceObject(obj: ReferenceObject) {
  return getDefinitionsObjectkey(obj.$ref);
}
