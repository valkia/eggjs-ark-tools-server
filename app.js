'use strict';
module.exports = app => {
  console.log('start app');

  if (app.config.env === 'local' || app.config.env === 'unittest') {
    app.beforeStart(async () => {
      //await app.model.sync({ force: true });// model修改同步到数据库
      await app.model.sync({alter:true});
      // force：true 会删除表重新建，增加字段或者删除字段都会同步到数据库，而且会把原本的表删除掉！所以这种操作用于本地开发
      // force：true：不会删除表，也不会更新字段，只会在没有表的情况下添加表
      // alter:true 添加字段
    });
    
  } else {
    app.beforeStart(async () => {
      await app.model.sync({alter:true});
      //await app.model.sync({ force: false });
    });
  }
};
