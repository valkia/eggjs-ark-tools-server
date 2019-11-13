'use strict';
class Resp {

  constructor() {
    this.data = {};
    this.status = 200;
    this.errMsg = '';
  }
  ok(data) {
    this.data = data;
    this.status = 200;
    this.errMsg = '';
    return this;
  }

  fail(errMsg) {
    this.data = {};
    this.status = 500;
    this.errMsg = errMsg;
    return this;
  }
}

module.exports = Resp;
