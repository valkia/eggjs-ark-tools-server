/* jshint indent: 2 */

module.exports = app => {

  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ChangeNumber = app.model.define('change_numbers', {
   
    mold: {
      type: STRING(10),
      allowNull: true
    },
    number: {
      type: STRING(10),
      allowNull: true
    },
    change_id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: true
    }
  });
  return ChangeNumber;
};
