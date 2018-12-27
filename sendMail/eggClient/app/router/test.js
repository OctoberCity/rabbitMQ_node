'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller,middleware } = app; 
  router.post('/sendByEgg',controller.test.sendByEgg);
   router.post('/sendByRabbit',controller.test.sendByRabbit);

 

};
