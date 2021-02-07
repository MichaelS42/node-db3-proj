// scheme-model
const db = require("../../data/db-config.js");

module.exports = { find, findById, findSteps, add, update, remove }

async function find() {
    return db("schemes")
}

function findById(id) {
    return db("schemes").where({ id }).first();
  }
  
   function findPosts(id) {
    return db("posts as p")
      .join("schemes as u", "u.id", "pschemes_id")
      .select("p.id", "u.username", "p.contents")
      .where({ user_id: id });
  }
  
   function add(user) {
    return db('schemes').insert(user);
  }
  
   function update(id, changes) {
    return db('schemes').update(changes).where({id})
  }
  
  async function remove(id) {
    return db('schemes').where({ id }).del();
  }