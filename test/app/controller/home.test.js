'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/home.test.js', () => {

  // Mocha 顺序
  before(() => console.log('before test'));
  after(() => console.log('finish test'));
  beforeEach(() => console.log('beforeEach'));
  afterEach(() => {
    console.log('afterEach');
    mock.restore;
  });
  it('should assert', () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should get a ctx', () => {
    const ctx = app.mockContext();
    assert(ctx.method === 'GET');
    assert(ctx.url === '/');
  });

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, egg')
      .expect(200);
  });

  it('should mock ctx.user', () => {
    const ctx = app.mockContext({
      user: {
        name: 'fengmk2',
      },
    });
    assert(ctx.user);
    assert(ctx.user.name === 'fengmk2');
  });

  // 使用返回 Promise 的方式
  it('should GET / By Promise', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, egg')
      .expect(200);
  });

  // 使用 async
  it('should GET / by async', async () => {
    await app.httpRequest()
      .get('/')
      .expect('hi, egg')
      .expect(200);
  });

  it('postBuddy should status 200 and get the request body', async () => {
    app.mockCsrf();
    const username = 'username' + parseInt(Math.random() * 100);
    const remark = 'remark' + parseInt(Math.random() * 100);
    const server = '官服';
    const res = await app.httpRequest()
      .post('/ark/postBuddy')
      .type('json')
      .send({
        id: username,
        remark: remark,
        server: server
      })
      .expect(200);
    console.log(res.text);
    assert(JSON.parse(res.text).data.username == username);
    assert(JSON.parse(res.text).data.remark == remark);
    assert(JSON.parse(res.text).data.server == server);
  });
  it('postChange should status 200 and get the request body', async () => {
    app.mockCsrf();
    const username = 'username' + parseInt(Math.random() * 100);
    const remark = 'remark' + parseInt(Math.random() * 100);
    const server = '官服';
    let clueList = {};
    let need = [];
    let have = [];
    let needStr = "";
    let haveStr = "";
    for (let i = 0; i < 7; i++) {
      let needBoolean = Math.random() >= 0.5;
      need.push({ name: (i + 1)+"", showFlag: needBoolean });
      have.push({ name: (i + 1)+"", showFlag: !needBoolean });
      if (needBoolean) {
        if (needStr !== '') {
          needStr = needStr + ',' + (i + 1);
        } else {
          needStr = (i + 1);
        }
      }
      if (!needBoolean) {
        if (haveStr !== '') {
          haveStr = haveStr + ',' + (i + 1);
        } else {
          haveStr = (i + 1);
        }
      }
    }


    clueList.need = need;
    clueList.have = have;
    const res = await app.httpRequest()
      .post('/ark/postChange')
      .type('json')
      .send({
        id: username,
        remark: remark,
        server: server,
        clueList: clueList
      })
      .expect(200);
    console.log(res.text);
    assert(JSON.parse(res.text).data.username == username);
    assert(JSON.parse(res.text).data.remark == remark);
    assert(JSON.parse(res.text).data.server == server);
    assert(JSON.parse(res.text).data.have == haveStr);
    assert(JSON.parse(res.text).data.need == needStr);
  });

  //https://i.loli.net/2019/11/25/ZQaymdSHgfiEPvN.jpg

  // it('upload should status 200 and get the request body', async () => {
  //   app.mockCsrf();
  //   const path = require('path');
  //   const fs = require('fs');
  //   //const img = require('./come.jpg');
  //   const file = fs.readFileSync(app.config.baseDir+"\\test\\app\\controller\\come.jpg");
  //   //console.log(img);
  //   const ctx = app.mockContext();
  //   ctx.request.files = [];
  //   ctx.request.files[0] = file;
  //   const res = await app.httpRequest()
  //     .post('/ark/upload')
  //     .type('json')
  //     .expect(200);
  //   console.log(res.text);
  //   assert(JSON.parse(res.text).data.username == username);
  //   assert(JSON.parse(res.text).data.remark == remark);
  //   assert(JSON.parse(res.text).data.server == server);
  // });
});
