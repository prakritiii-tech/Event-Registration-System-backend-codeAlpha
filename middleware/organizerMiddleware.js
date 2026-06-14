const organizerOnly = (req, res, next) => {
  if (req.user && req.user.role === "organizer") {
    return next();
  }

  return res.status(403).json({
    message: "Only organizers can perform this action",
  });
};

module.exports = organizerOnly;