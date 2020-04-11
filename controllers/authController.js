const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

exports.createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);

  user.password = undefined;

  res.status(201).send({
    status: 'success',
    data: { user },
  });
});
