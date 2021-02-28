export const innerType = {
  List: "Array",
  Map: "Record",
};
export const outerType = {
  Array: ["List"],
  Map: "Record",
};
export const inlineTypeList = [
  "string",
  "number",
  "boolean",
  "object",
  "array",
  "null",
  "Array",
  "Record"
]

export interface TemplateType {
  parent: string;
  args: Array<TemplateType | string>;
  _raw: string;
}
/**
 * @param {string} parent
 * @param {Array<TemplateType | string>} args
 * @returns TemplateType
 */
export function createType(
  parent: TemplateType["parent"],
  args: TemplateType["args"],
  _raw: TemplateType['_raw']
) {
  return {
    parent,
    args,
    _raw
  };
}

export function parseArgstr(argsStr: string) {
  // 解析成为
  const argsStrList: string[] = [];
  let count = 0;
  let temp = "";
  for (let index = 0; index < argsStr.length; index++) {
    const element = argsStr[index];
    if (count === 0) {
      if (element === ",") {
        argsStrList.push(temp.trim());
        temp = "";
        continue;
      }
    }
    temp += element;
    if (element === "«") {
      count += 1;
    } else if (element === "»") {
      count -= 1;
    }
  }
  if (temp) {
    argsStrList.push(temp.trim());
  }
  return argsStrList;
}

export default function templateTypeParse(str: string) {
  let end = str.lastIndexOf("»");
  let start = str.indexOf("«");

  if (start < 0) {
    return str;
  }
  let passTemplateType: string[] = []; // 这是一个同步方法。
  let parent = str.substring(0, start);
  // 替换内置类型。
  if (parent in innerType) {
    parent = innerType[parent];
  } else {
    passTemplateType.push(parent);
  }

  const argsStrList = parseArgstr(str.substring(start + 1, end)).map((v) => {
    const res = templateTypeParse(v);

    passTemplateType = [
      ...passTemplateType,
      ...(typeof res === "string" ? [] : res[1]),
    ];
    return typeof res === "string" ? res : res[0];
  });

  const res: [TemplateType, string[]] = [
    createType(parent, argsStrList, str),
    passTemplateType,
  ];
  return res;
}

export function templateTypeEach(
  type: TemplateType,
  cb: (type: TemplateType) => void
) {
  cb(type);
  type.args.forEach((v) => {
    if (typeof v !== "string") {
      templateTypeEach(v, cb);
    }
  });
}
