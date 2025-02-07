const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const NotFoundError = require('../errors/NotFoundError');
const indexRouter = Router();

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

indexRouter.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Mini Messageboard',
    messages: messages,
  });
});

indexRouter.get('/new', (req, res) => {
  res.render('pages/form', { title: 'New message' });
});

indexRouter.post('/new', (req, res) => {
  const { messageText, messageUser } = req.body;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect('/');
});

indexRouter.get(
  '/details/:index',
  asyncHandler((req, res) => {
    const index = req.params.index;
    if (index < 0 || index >= messages.length) {
      throw new NotFoundError();
    }
    res.render('pages/details', {
      title: 'Detais',
      message: messages[index],
    });
  })
);

module.exports = indexRouter;
