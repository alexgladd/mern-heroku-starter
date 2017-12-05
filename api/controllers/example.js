// example controller

exports.authenticatedResource = (req, res) => {
  res.json({ message: 'Only authenticated users can see this message!' });
}

exports.authorizedResource = (req, res) => {
  res.json({ message: `Your authorized user ID is ${req.authUser.id}` });
}
