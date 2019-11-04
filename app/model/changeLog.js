/* jshint indent: 2 */

module.exports = app => {

  const { STRING, INTEGER, DATE ,TIMESTAMP} = app.Sequelize;

  const changeLog = app.model.define('change_logs', {
    
    username: {
      type: STRING(80),
      allowNull: true
    },
    server: {
      type: STRING(120),
      allowNull: true
    },
    remark: {
      type: STRING(120),
      allowNull: true
    },
    need: {
      type: STRING(120),
      allowNull: true
    },
    have: {
      type: STRING(120),
      allowNull: true
    }
  });
  return changeLog;
};
