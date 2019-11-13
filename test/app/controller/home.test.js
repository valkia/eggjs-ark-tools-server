'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/home.test.js', () => {

  // Mocha 顺序
  before(() => console.log('order 1'));
  before(() => console.log('order 2'));
  after(() => console.log('order 6'));
  beforeEach(() => console.log('order 3'));
  afterEach(() => console.log('order 5'));

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
});
