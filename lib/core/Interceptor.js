export default class Interceptor {
  constructor () {
    this.hooks = []
  }
  use (resolve, reject) {
    let fn = (e) => e
    resolve = resolve || fn
    reject = reject || fn
    this.hooks.push({
      resolve,
      reject
    })
  }
}