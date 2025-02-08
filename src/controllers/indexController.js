const asyncHandler = require('express-async-handler');
const NotFoundError = require('../errors/NotFoundError');

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

const getMessageList = asyncHandler((req, res) => {
  res.render('pages/index', {
    title: 'Mini Messageboard',
    messages: messages,
  });
});

const getCreateMessage = asyncHandler((req, res) => {
  res.render('pages/form', { title: 'New message' });
});

const postCreateMessage = asyncHandler((req, res) => {
  const { messageText, messageUser } = req.body;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect('/');
});

const getMessageDetails = asyncHandler((req, res) => {
  const index = req.params.index;
  if (index < 0 || index >= messages.length) {
    throw new NotFoundError();
  }
  res.render('pages/details', {
    title: 'Detais',
    message: messages[index],
  });
});

const indexController = {
  getMessageList,
  getCreateMessage,
  postCreateMessage,
  getMessageDetails,
};

module.exports = indexController;
