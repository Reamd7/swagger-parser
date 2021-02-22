/**
 * 使用es6的语法，支持如果模板字符串为null时，渲染为空字符串
 * @param {string[]} stringArr
 * @param  {any[]} values
 */
export default function tag(stringArr: TemplateStringsArray, ...values: any[]) {
  if (values.length === 0) {
    return stringArr[0];
  } else if (values.filter(Boolean).length === values.length) {
    return stringArr
      .map((val, index) => {
        if (values[index]) {
          return val + values[index];
        } else {
          return val;
        }
      })
      .join("");
  } else {
    return "";
  }
}
