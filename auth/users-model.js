const db = require("../database/dbConfig");
const users = () => db("users");

function getByUsername(username) {
  return users()
    .where({ username })
    .first();
}

function getById(id) {
  return users()
    .where({ id })
    .first();
}

function getAll() {
  return users();
}

function insert(user) {
  return users()
    .insert(user)
    .then(([id]) => getById(id).select("id", "username"));
}

module.exports = {
  getAll,
  getById,
  getByUsername,
  insert
};
