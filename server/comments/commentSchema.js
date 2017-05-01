const sql = require('../../secret/sql.js');
const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', sql.password);

const Comment = db.define('Comment', {
    comment: Sequelize.STRING
});

module.exports = Comment;