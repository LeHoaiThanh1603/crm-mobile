/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
* */

export default function access(initialState) {
  let canAdmin = false;

  return {
    canAdmin: canAdmin,
    canDebug: false
  };
}
