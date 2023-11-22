function clientError(res, msg) {
  return res.status(400).json({ message: msg });
}

function serverError(res) {
  return res
    .status(500)
    .json({ message: "An error occured. Please try again later" });
}

module.exports = { clientError, serverError };
