const asyncHandler = require('express-async-handler');
const NotFoundError = require('../errors/NotFoundError');
const db = require('../db/query');

const getMessageList = asyncHandler(async (req, res) => {
  res.render('pages/index', {
    title: 'Mini Messageboard',
    messages: await db.getMessageList(),
  });
});

const getCreateMessage = asyncHandler(async (req, res) => {
  res.render('pages/form', { title: 'New message' });
});

const postCreateMessage = asyncHandler(async (req, res) => {
  const { messageAuthor, messageText } = req.body;
  await db.addMessage(messageAuthor, messageText);
  res.redirect('/');
});

const getMessageDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const message = (await db.getMessageDetails(id))[0];
  if (!message) {
    throw new NotFoundError('Cannot find message!');
  }
  res.render('pages/details', {
    title: 'Detais',
    message: message,
  });
});

const indexController = {
  getMessageList,
  getCreateMessage,
  postCreateMessage,
  getMessageDetails,
};

module.exports = indexController;
