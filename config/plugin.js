'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };
// orm
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.alinode = {
  enable: true,
  package: 'egg-alinode',
};