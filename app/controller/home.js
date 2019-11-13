'use strict';

const Controller = require('egg').Controller;
const Resp = require('./resp.js');
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.service.ark.test();
    ctx.body = 'hi, egg';
  }

  async upload() {
    const { ctx } = this;
    console.log('upload');
    const res = await this.service.ark.upload();
    ctx.body = new Resp().ok(res);
  }

  async getTagsAval() {
    const { ctx } = this;
    ctx.body = new Resp().ok(await this.service.ark.getTagsAval());
  }

  async getChangeList() {
    console.log('getChangeList');
    const { ctx } = this;
    const { keyword, pageIndex, pageSize } = ctx.request.body;
    console.log(keyword, pageIndex, pageSize);
    ctx.body = new Resp().ok(await this.service.ark.getChangeList(keyword, pageIndex, pageSize));
  }

  async postChange() {
    const { ctx } = this;
    ctx.body = new Resp().ok(await this.service.ark.postChange(ctx.request.body));
  }

  async testUploadImg() {
    const { ctx } = this;
    console.log('testUploadImg');


    ctx.body = new Resp().ok(this.service.ark.upload());

  }

}

module.exports = HomeController;
