const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  findUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/user');

// вернуть всех пользователей базы
router.get('/', getUser);
// возвращает информацию о текущем пользователе
router.get('/me', getCurrentUser);
// обновить информацию о пользователе
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateProfile,
);
// обновить аватар
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(
          /https?:\/\/(www\.)?([\w-]+\.)+\w+[\w\-._~:/?#[\]@!$&'()*,;=]*/,
        ),
    }),
  }),
  updateAvatar,
);
// возвращает определенного пользователя по id
router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  findUserById,
);

module.exports = router;
