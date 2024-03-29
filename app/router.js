'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/ark/upload', controller.home.upload);
  router.get('/ark/uploadTest', controller.home.upload);
  router.get('/ark/tagsAval', controller.home.getTagsAval);
  router.post('/ark/changeList', controller.home.getChangeList);
  router.post('/ark/postChange', controller.home.postChange);
  router.post('/ark/buddyList', controller.home.getBuddyList);
  router.post('/ark/postBuddy', controller.home.postBuddy);
};
