import { User } from './user.model.js';

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

export function getAll(req, res, next) {
  return User.find().then((userlist) => {
    res.render('userlist', { data: userlist });
  });
}

export function create(req, res, next) {
  return User.create(req.body)
    .then(function (user) {
      return user;
    })
    .then((entity) => {
      if (entity) {
        res.status(201).json(entity);
      }
    });
}

export function login(req, res, next) {
  const { email, password } = req.body || {};
  return User.findOne({ email, password })
    .then((user) => {
      return user;
    })
    .then(responseWithResult(res));
}

export function available(req, res) {
  const { email, latitude, longitude } = req.body || {};
  console.log(email, latitude, longitude);
  return User.available(email, { latitude, longitude })
    .then((user) => {
      return '아휴 이제 손님좀 받아보자';
    })
    .then(responseWithResult(res));
  //.catch 처리하자.
}
export function unavailable(req, res) {
  console.log(req.body.email);
  return User.unavailable(req.body.email)
    .then((user) => {
      return '손님 못 받음';
    })
    .then(responseWithResult(res));
  //.catch 처리하자.
}
