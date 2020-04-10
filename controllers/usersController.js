const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const words = require('../configuration/words');
const NotFoundError = require('../errors/NotFoundError');

exports.getMe = catchAsync(async (req, res) => {
  const { _id: id } = req.user;

  const user = await User.findById(id)
    .orFail(new NotFoundError(words.USER_NOT_FOUND));

  res.send({
    status: 'success',
    data: { user },
  });
});
