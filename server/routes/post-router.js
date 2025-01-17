/* eslint-disable camelcase */
const { Router } = require('express');
const postRoute = Router();
const { newPost, findItemPost, findAllPost, findUserPost } = require('../helpers/postHelper');

postRoute.get('/allPost', (req, res) => {
  findAllPost()
    .then((data) => {
      res.status(200).send(data);
    }).catch((err) => {
      console.log('post-router Err');
      res.sendStatus(500);
    });
});

postRoute.get('/itemPost/:itemId', (req, res) => {
  findItemPost(req.params.itemId)
    .then((data) => {
      res.status(200).send(data);
    }).catch((err) => {
      res.sendStatus(500);
    });
});

postRoute.get('/userPost/:userId', (req, res) => {
  findUserPost(req.params.userId)
    .then((data) => {
      res.status(200).send(data);
    }).catch((err) => {
      res.sendStatus(500);
    });
});

postRoute.post('/insertPost', (req, res) => {
  const { rating, description, itemId, userId } = req.body;
  const post = {
    rating: rating,
    description: description,
    itemId: itemId,
    userId: userId
  };
  return newPost(post)
    .then((data) => {
      res.sendStatus(201).send(data);
    }).catch((err) => res.sendStatus(500));
});

module.exports = postRoute;