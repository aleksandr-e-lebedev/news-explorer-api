module.exports = function catchAsync(asyncFunc) {
  return (req, res, next) => {
    asyncFunc(req, res, next)
      .catch(next);
  };
};
