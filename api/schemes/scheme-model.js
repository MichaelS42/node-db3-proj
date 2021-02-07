// scheme-model
const db = require("../../data/db-config.js");

module.exports = { find, findById, findSteps, add, update, remove };

async function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .then((schemaObject) => {
      if (!schemaObject.length) {
        return Promise.resolve(null);
      }
      return schemaObject;
    });
}

function findSteps(id) {
  return db("steps")
    .join("schemes", "steps.scheme_id", "schemes.id")
    .select("p.id", "u.username", "p.contents")
    .where({ user_id: id });
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then((id) => {
      return findById(id);
    });
}

function update(id, changes) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

async function remove(id) {
  return db("schemes").where({ id }).del();
}
