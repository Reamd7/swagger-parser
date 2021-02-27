import { Document } from "../../base";
import noSupport from "../../util/noSupport";
import tag from "../../util/tag";
import OperationObjectClass from "./OperationObject";

const methodList = [
  "get",
  "put",
  "post",
  "del",
  "delete",
  "options",
  "head",
  "patch",
] as const;

export default function PathsObject(
  obj: Document["paths"],
  base: Document,
  splitFiles: false | string = "./ @api"
) {
  return Object.entries(obj).reduce((res, [url, path]) => {
    noSupport(
      path.$ref,
      url + " 暂时不支持 PathItemObject 的 ref " + path.$ref
    );
    noSupport(
      path.parameters,
      url + " 暂时不支持 PathItemObject 的 parameters "
    );
    for (const method of methodList) {
      const op = path[method];
      if (op) {
        const operationId = OperationObjectClass.OperationName(
          OperationObjectClass.UrlToName(url),
          method
        );
        const subType = new OperationObjectClass(op, base, {
          operationId,
          url,
          method,
        }).typescript();

        res[operationId] = `\
${splitFiles ? tag`import { apiRequest } from "${splitFiles}" ` : ""}\
${subType.data.params.type}
${subType.data.response.type}

export ${splitFiles ? "default" : ""} function ${operationId}(params: ${subType.data.params.key}) {
  // TODO 这里还没有实现 params 参数的校验
  return apiRequest<${subType.data.response.key}>({
    url: "${url}",
    params: params,
    method: "${method}",
    accept: "${subType.data.accept.join(";")}",
    contentType: "${subType.data["content-type"].join(";")}"
  })
}`;
      }
    }
    return res;
    // -------------------------------------------
  }, {} as Record<string, string>);
}

export function PathsObjectEach<T>(
  obj: ReturnType<typeof PathsObject>,
  cb: (key: string, value: string) => T
): T[] {
  return Object.entries(obj)
    .map(([key, value]) => cb(key, value))
    .filter((v) => v !== undefined);
}
