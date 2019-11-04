'use strict';

const Controller = require('egg').Controller;
let Resp = require('./resp.js');
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.service.ark.test();
    ctx.body = 'hi, egg';
  }

  async upload(){
    const { ctx } = this;
    console.log("upload")
    let res = await this.service.ark.upload()
    ctx.body = new Resp().ok(res);
  }

  async getTagsAval(){

  }

  async getChangeList(){

  }

  async postChange(){

  }

  async testUploadImg() {
    const { ctx } = this;
    console.log("testUploadImg")

    
    ctx.body = new Resp().ok(this.service.ark.upload());

  }
  
}

module.exports = HomeController;
