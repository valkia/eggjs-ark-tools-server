'use strict';
/* jshint indent: 2 */
// 发布的加好友信息
module.exports = app => {

  const { STRING } = app.Sequelize;

  const BuddyLog = app.model.define('buddy_log', {

    username: {
      type: STRING(80),
      allowNull: true,
    },
    server: {
      type: STRING(120),
      allowNull: true,
    },
    remark: {
      type: STRING(120),
      allowNull: true,
    },
  });
  return BuddyLog;
};
