const Card = require('../models/card');
const { errorMessage } = require('../utils/errorMessage');
const { NOT_FOUND_ERROR } = require('../errors/notFoundError');
const { FORBIDDEN_ERROR } = require('../errors/forbiddenError');
const { CREATED } = require('../utils/successes');

// функция возврата всех каточек
const getCard = (req, res, next) => {
  Card.find({})
    .sort({ createdAt: -1 })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res, next));
};
// функция создания карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch((err) => errorMessage(err, req, res, next));
};
// функция удаления карточки
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NOT_FOUND_ERROR('Карточка с таким id не найдена');
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new FORBIDDEN_ERROR('Эту карточку нельзя удалить');
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res, next));
};
// функция лайка карточки
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NOT_FOUND_ERROR('Карточка с таким id не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res, next));
};
// функция отменя лайка карточки
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NOT_FOUND_ERROR('Карточка с таким id не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports = {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
};
