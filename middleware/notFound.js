const notFound = (req, res) => res.status(404).send("Route doesn't exits")

export default notFound;