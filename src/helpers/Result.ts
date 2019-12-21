import {HTTPError} from "../helpers"

export class Result<T = undefined> {
    constructor(public data?: T, public error?: HTTPError) {}
  
    errless(): this is this & { data: T } {
      return !this.error;
    }
  }