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

  it('should status 200 and get the request body', async () => {
    // 模拟 CSRF token，下文会详细说明
    app.mockCsrf();
    const username = 'username' + parseInt(Math.random()*100);
    const remark = 'remark' + parseInt(Math.random()*100);
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
});
