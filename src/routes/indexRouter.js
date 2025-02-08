const { Router } = require('express');
const indexController = require('../controllers/indexController');
const indexRouter = Router();

indexRouter.get('/', indexController.getMessageList);

indexRouter.get('/new', indexController.getCreateMessage);

indexRouter.post('/new', indexController.postCreateMessage);

indexRouter.get('/details/:index', indexController.getMessageDetails);

module.exports = indexRouter;
