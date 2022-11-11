const tryCatchWrapper = (req, res) => {
  try {
    req;
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { tryCatchWrapper };
