function noSupport(args: any, str: string): void
function noSupport(args: string): void
function noSupport(args: any, str?: string): void {
  if (str) {
    if (args != undefined || args === false) {
      console.warn(str);
    }
  } else {
    console.warn(args);
  }
}

export default noSupport;