// 专门处理 type 和 format

interface JSONType {
  type: string;
  format?: string;
}

const typeList = [
  "string", "number", "interger", "boolean", "array", "file", "object"
]